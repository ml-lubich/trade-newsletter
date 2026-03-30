export interface Database {
  public: {
    Tables: {
      subscribers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          trade: string | null;
          subscribed_at: string;
          unsubscribed_at: string | null;
          status: "active" | "unsubscribed";
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          trade?: string | null;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          status?: "active" | "unsubscribed";
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          trade?: string | null;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          status?: "active" | "unsubscribed";
        };
      };
      newsletters: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          trade_category: string | null;
          published_at: string | null;
          status: "draft" | "published" | "sent";
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content: string;
          trade_category?: string | null;
          published_at?: string | null;
          status?: "draft" | "published" | "sent";
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          content?: string;
          trade_category?: string | null;
          published_at?: string | null;
          status?: "draft" | "published" | "sent";
        };
      };
      newsletter_sends: {
        Row: {
          id: string;
          newsletter_id: string;
          subscriber_id: string;
          sent_at: string;
          opened_at: string | null;
          clicked_at: string | null;
        };
        Insert: {
          id?: string;
          newsletter_id: string;
          subscriber_id: string;
          sent_at?: string;
          opened_at?: string | null;
          clicked_at?: string | null;
        };
        Update: {
          id?: string;
          newsletter_id?: string;
          subscriber_id?: string;
          sent_at?: string;
          opened_at?: string | null;
          clicked_at?: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          [key: string]: unknown;
        };
        Insert: {
          id: string;
          [key: string]: unknown;
        };
        Update: {
          id?: string;
          [key: string]: unknown;
        };
      };
    };
  };
}
