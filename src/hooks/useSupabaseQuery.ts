
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      console.log('Fetching clients...')
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching clients:', error)
        throw error;
      }
      console.log('Clients fetched:', data)
      return data;
    },
  });
};

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      console.log('Fetching jobs...')
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select(`
            *,
            clients(name, email),
            job_staff!job_staff_job_id_fkey(
              staff!job_staff_staff_id_fkey(id, name, email, rating)
            )
          `)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching jobs:', error)
          throw error;
        }
        console.log('Jobs fetched successfully:', data)
        return data || [];
      } catch (error) {
        console.error('Failed to fetch jobs:', error)
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000,
  });
};

export const useStaff = () => {
  return useQuery({
    queryKey: ['staff'],
    queryFn: async () => {
      console.log('Fetching staff...')
      try {
        const { data, error } = await supabase
          .from('staff')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching staff:', error)
          throw error;
        }
        console.log('Staff fetched successfully:', data)
        return data || [];
      } catch (error) {
        console.error('Failed to fetch staff:', error)
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000,
  });
};

export const useStaffPerformance = () => {
  return useQuery({
    queryKey: ['staff-performance'],
    queryFn: async () => {
      console.log('Fetching staff performance...')
      const { data, error } = await supabase
        .from('staff_performance')
        .select(`
          *,
          staff!staff_performance_staff_id_fkey(name, role, email)
        `)
        .order('performance_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching staff performance:', error)
        throw error;
      }
      console.log('Staff performance fetched:', data)
      return data || [];
    },
  });
};

export const useStaffSchedules = () => {
  return useQuery({
    queryKey: ['staff-schedules'],
    queryFn: async () => {
      console.log('Fetching staff schedules...')
      const { data, error } = await supabase
        .from('staff_schedules')
        .select(`
          *,
          staff!staff_schedules_staff_id_fkey(name, role, email, status)
        `)
        .order('schedule_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching staff schedules:', error)
        throw error;
      }
      console.log('Staff schedules fetched:', data)
      return data || [];
    },
  });
};

export const useInvoices = () => {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      console.log('Fetching invoices...')
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          clients(name, email)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching invoices:', error)
        throw error;
      }
      console.log('Invoices fetched:', data)
      return data || [];
    },
  });
};

export const useInventory = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      console.log('Fetching inventory...')
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching inventory:', error)
        throw error;
      }
      console.log('Inventory fetched:', data)
      return data || [];
    },
  });
};

export const useEquipment = () => {
  return useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      console.log('Fetching equipment...')
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching equipment:', error)
        throw error;
      }
      console.log('Equipment fetched:', data)
      return data || [];
    },
  });
};
