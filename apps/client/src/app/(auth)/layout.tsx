import { requireNotSession } from '@/utils/auth';
import React from 'react'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
    await requireNotSession();
    

    return (
        <div>{children}</div>
    )
}

export default AuthLayout;