export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          created_at: string
          id: string
          notes: string | null
          status: string
          surgeon_id: string | null
          treatment_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          appointment_date: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          surgeon_id?: string | null
          treatment_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          appointment_date?: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          surgeon_id?: string | null
          treatment_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_surgeon_id_fkey"
            columns: ["surgeon_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      dental_records: {
        Row: {
          created_at: string
          diagnosis: string | null
          id: string
          notes: string | null
          record_date: string
          surgeon_id: string | null
          treatment: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          diagnosis?: string | null
          id?: string
          notes?: string | null
          record_date?: string
          surgeon_id?: string | null
          treatment?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          diagnosis?: string | null
          id?: string
          notes?: string | null
          record_date?: string
          surgeon_id?: string | null
          treatment?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dental_records_surgeon_id_fkey"
            columns: ["surgeon_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dental_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          invited_by: string | null
          is_used: boolean | null
          otp_code: string
          otp_expires_at: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          invited_by?: string | null
          is_used?: boolean | null
          otp_code: string
          otp_expires_at?: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          invited_by?: string | null
          is_used?: boolean | null
          otp_code?: string
          otp_expires_at?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          sent_at: string | null
          sent_via: string[] | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          sent_at?: string | null
          sent_via?: string[] | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          sent_at?: string | null
          sent_via?: string[] | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      pre_orders: {
        Row: {
          balance_due: number
          contact_info: string
          customer_name: string
          date: string
          deposit_amount: number
          description: string | null
          expected_delivery: string
          id: string
          id_document_path: string | null
          item_name: string
          payment_method: string
          quantity: number
          received_by: string
          special_instructions: string | null
          status: string
          total_amount: number
        }
        Insert: {
          balance_due: number
          contact_info: string
          customer_name: string
          date: string
          deposit_amount: number
          description?: string | null
          expected_delivery: string
          id?: string
          id_document_path?: string | null
          item_name: string
          payment_method?: string
          quantity?: number
          received_by: string
          special_instructions?: string | null
          status?: string
          total_amount: number
        }
        Update: {
          balance_due?: number
          contact_info?: string
          customer_name?: string
          date?: string
          deposit_amount?: number
          description?: string | null
          expected_delivery?: string
          id?: string
          id_document_path?: string | null
          item_name?: string
          payment_method?: string
          quantity?: number
          received_by?: string
          special_instructions?: string | null
          status?: string
          total_amount?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          address: string | null
          created_at: string
          date_of_birth: string | null
          email: string
          full_name: string
          gender: string | null
          id: string
          medical_aid_number: string | null
          medical_aid_provider: string | null
          phone_number: string | null
          role: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          full_name: string
          gender?: string | null
          id: string
          medical_aid_number?: string | null
          medical_aid_provider?: string | null
          phone_number?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          full_name?: string
          gender?: string | null
          id?: string
          medical_aid_number?: string | null
          medical_aid_provider?: string | null
          phone_number?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_user_manually: {
        Args: {
          p_email: string
          p_password: string
          p_full_name: string
          p_role?: string
        }
        Returns: string
      }
      create_invitation: {
        Args: { p_email: string; p_full_name: string; p_role?: string }
        Returns: Json
      }
      generate_otp: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      list_all_users: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          email: string
          full_name: string
          role: string
          created_at: string
          updated_at: string
        }[]
      }
      verify_otp_and_create_user: {
        Args: { p_email: string; p_otp_code: string; p_password: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
