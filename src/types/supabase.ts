export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cocktails: {
        Row: {
          businessId: number | null
          businessName: string | null
          category: string | null
          description: string | null
          id: number
          ingredients: Json | null
          menu_url: string | null
          name: string | null
          scoreBitter: number | null
          scoreSour: string | null
          scoreSpicy: string | null
          scoreSweet: string | null
          website_url: string | null
        }
        Insert: {
          businessId?: number | null
          businessName?: string | null
          category?: string | null
          description?: string | null
          id?: number
          ingredients?: Json | null
          menu_url?: string | null
          name?: string | null
          scoreBitter?: number | null
          scoreSour?: string | null
          scoreSpicy?: string | null
          scoreSweet?: string | null
          website_url?: string | null
        }
        Update: {
          businessId?: number | null
          businessName?: string | null
          category?: string | null
          description?: string | null
          id?: number
          ingredients?: Json | null
          menu_url?: string | null
          name?: string | null
          scoreBitter?: number | null
          scoreSour?: string | null
          scoreSpicy?: string | null
          scoreSweet?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      cocktails_by_category: {
        Row: {
          category: string | null
          count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
