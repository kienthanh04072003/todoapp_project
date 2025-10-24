import React from 'react'
import notfoundimg from '../assets/imgs/404_NotFound.png'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <>

      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50">
        <img src={notfoundimg} alt="not found" className="max-w-full mb-6 w-96" />
        <p className="text-xl font-semibold">trang ban tim hien khong ton tai</p>
        <a href="/" className="inline-block px-6 py-3 mt-6 font-medium text-while transition shadow-md bg-primary rounded-2xl hover:bg-primary-dark">
          an de quay ve trang chu
        </a>

        <Button variant="default" className="mt-4" onClick={() => toast("bam cai cc =))) ")}>cai nay lam thu cho vui</Button>

      </div>
    </>
  )
}

export default NotFound