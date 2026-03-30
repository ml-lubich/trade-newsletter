-- Subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  trade TEXT,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed'))
);

-- Newsletters table
CREATE TABLE IF NOT EXISTS newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  trade_category TEXT,
  published_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'sent'))
);

-- Newsletter sends table
CREATE TABLE IF NOT EXISTS newsletter_sends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  newsletter_id UUID NOT NULL REFERENCES newsletters(id) ON DELETE CASCADE,
  subscriber_id UUID NOT NULL REFERENCES subscribers(id) ON DELETE CASCADE,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_newsletters_user_id ON newsletters(user_id);
CREATE INDEX IF NOT EXISTS idx_newsletters_status ON newsletters(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_newsletter_id ON newsletter_sends(newsletter_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_subscriber_id ON newsletter_sends(subscriber_id);

-- RLS policies
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_sends ENABLE ROW LEVEL SECURITY;

-- Subscribers: anyone can insert (subscribe), authenticated users can read
CREATE POLICY "Anyone can subscribe" ON subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscribers" ON subscribers
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Subscribers can unsubscribe themselves" ON subscribers
  FOR UPDATE USING (true)
  WITH CHECK (true);

-- Newsletters: owners can CRUD
CREATE POLICY "Users can manage own newsletters" ON newsletters
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view published newsletters" ON newsletters
  FOR SELECT USING (status = 'published' OR status = 'sent');

-- Newsletter sends: owners can view
CREATE POLICY "Users can view sends for own newsletters" ON newsletter_sends
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM newsletters WHERE newsletters.id = newsletter_sends.newsletter_id AND newsletters.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert sends for own newsletters" ON newsletter_sends
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM newsletters WHERE newsletters.id = newsletter_sends.newsletter_id AND newsletters.user_id = auth.uid()
    )
  );
