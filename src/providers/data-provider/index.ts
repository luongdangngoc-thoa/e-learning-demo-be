'use client'

import { dataProvider as dataProviderSupabase } from '@refinedev/supabase'
import { supabaseBrowserClient } from '@shared/utils/supabase/client'

export const dataProvider = dataProviderSupabase(supabaseBrowserClient)
