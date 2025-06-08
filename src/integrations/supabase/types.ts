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
      clients: {
        Row: {
          address: string | null
          company: string | null
          contact_person: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          company?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          company?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      equipment: {
        Row: {
          created_at: string | null
          id: string
          last_maintenance: string | null
          location: string | null
          model: string | null
          name: string
          next_maintenance: string | null
          notes: string | null
          purchase_date: string | null
          purchase_price: number | null
          serial_number: string | null
          status: string | null
          type: string
          updated_at: string | null
          warranty_expiry: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_maintenance?: string | null
          location?: string | null
          model?: string | null
          name: string
          next_maintenance?: string | null
          notes?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          serial_number?: string | null
          status?: string | null
          type: string
          updated_at?: string | null
          warranty_expiry?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_maintenance?: string | null
          location?: string | null
          model?: string | null
          name?: string
          next_maintenance?: string | null
          notes?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          serial_number?: string | null
          status?: string | null
          type?: string
          updated_at?: string | null
          warranty_expiry?: string | null
        }
        Relationships: []
      }
      inventory: {
        Row: {
          category: string
          created_at: string | null
          current_stock: number | null
          description: string | null
          id: string
          location: string | null
          max_stock_level: number | null
          min_stock_level: number | null
          name: string
          sku: string | null
          supplier: string | null
          unit_price: number | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          current_stock?: number | null
          description?: string | null
          id?: string
          location?: string | null
          max_stock_level?: number | null
          min_stock_level?: number | null
          name: string
          sku?: string | null
          supplier?: string | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          current_stock?: number | null
          description?: string | null
          id?: string
          location?: string | null
          max_stock_level?: number | null
          min_stock_level?: number | null
          name?: string
          sku?: string | null
          supplier?: string | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          client_id: string | null
          created_at: string | null
          due_date: string | null
          id: string
          invoice_number: string
          job_id: string | null
          notes: string | null
          paid_date: string | null
          status: string | null
          tax_amount: number | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          amount: number
          client_id?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          invoice_number: string
          job_id?: string | null
          notes?: string | null
          paid_date?: string | null
          status?: string | null
          tax_amount?: number | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          amount?: number
          client_id?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string
          job_id?: string | null
          notes?: string | null
          paid_date?: string | null
          status?: string | null
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_staff: {
        Row: {
          assigned_at: string | null
          id: string
          job_id: string | null
          staff_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          id?: string
          job_id?: string | null
          staff_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          id?: string
          job_id?: string | null
          staff_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_job_staff_job_id"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_job_staff_staff_id"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_staff_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_staff_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          actual_duration: number | null
          client_id: string | null
          created_at: string | null
          description: string | null
          estimated_duration: number | null
          id: string
          location: string | null
          price: number | null
          priority: Database["public"]["Enums"]["job_priority"] | null
          scheduled_date: string | null
          scheduled_time: string | null
          service_type: string
          special_instructions: string | null
          status: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          actual_duration?: number | null
          client_id?: string | null
          created_at?: string | null
          description?: string | null
          estimated_duration?: number | null
          id?: string
          location?: string | null
          price?: number | null
          priority?: Database["public"]["Enums"]["job_priority"] | null
          scheduled_date?: string | null
          scheduled_time?: string | null
          service_type: string
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          actual_duration?: number | null
          client_id?: string | null
          created_at?: string | null
          description?: string | null
          estimated_duration?: number | null
          id?: string
          location?: string | null
          price?: number | null
          priority?: Database["public"]["Enums"]["job_priority"] | null
          scheduled_date?: string | null
          scheduled_time?: string | null
          service_type?: string
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          created_at: string | null
          email: string | null
          hire_date: string | null
          hourly_rate: number | null
          id: string
          jobs_today: number | null
          location: string | null
          name: string
          phone: string | null
          rating: number | null
          role: string
          status: Database["public"]["Enums"]["staff_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          hire_date?: string | null
          hourly_rate?: number | null
          id?: string
          jobs_today?: number | null
          location?: string | null
          name: string
          phone?: string | null
          rating?: number | null
          role: string
          status?: Database["public"]["Enums"]["staff_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          hire_date?: string | null
          hourly_rate?: number | null
          id?: string
          jobs_today?: number | null
          location?: string | null
          name?: string
          phone?: string | null
          rating?: number | null
          role?: string
          status?: Database["public"]["Enums"]["staff_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      staff_performance: {
        Row: {
          created_at: string
          efficiency_score: number | null
          id: string
          notes: string | null
          performance_date: string
          punctuality_score: number | null
          revenue_generated: number | null
          satisfaction_score: number | null
          staff_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          efficiency_score?: number | null
          id?: string
          notes?: string | null
          performance_date?: string
          punctuality_score?: number | null
          revenue_generated?: number | null
          satisfaction_score?: number | null
          staff_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          efficiency_score?: number | null
          id?: string
          notes?: string | null
          performance_date?: string
          punctuality_score?: number | null
          revenue_generated?: number | null
          satisfaction_score?: number | null
          staff_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_performance_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_schedules: {
        Row: {
          break_end: string | null
          break_start: string | null
          created_at: string
          end_time: string
          id: string
          is_available: boolean | null
          notes: string | null
          schedule_date: string
          staff_id: string
          start_time: string
          updated_at: string
        }
        Insert: {
          break_end?: string | null
          break_start?: string | null
          created_at?: string
          end_time: string
          id?: string
          is_available?: boolean | null
          notes?: string | null
          schedule_date: string
          staff_id: string
          start_time: string
          updated_at?: string
        }
        Update: {
          break_end?: string | null
          break_start?: string | null
          created_at?: string
          end_time?: string
          id?: string
          is_available?: boolean | null
          notes?: string | null
          schedule_date?: string
          staff_id?: string
          start_time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_schedules_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      job_priority: "low" | "normal" | "high" | "urgent"
      job_status: "scheduled" | "in-progress" | "completed" | "cancelled"
      staff_status: "available" | "on-job" | "offline" | "break"
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
    Enums: {
      job_priority: ["low", "normal", "high", "urgent"],
      job_status: ["scheduled", "in-progress", "completed", "cancelled"],
      staff_status: ["available", "on-job", "offline", "break"],
    },
  },
} as const
