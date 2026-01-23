"use client";

import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { Badge } from '../ui/badge';
import { useRouter } from 'next/navigation';

function KycClientButton({ kyc, userId }: { kyc: { status: string, image: string, type: string }, userId: string }) {
  const router = useRouter();

  const handleKyc = (status: KYCStatus) => {
    authClient.admin.updateUser({
      userId,
      data: {
        kyc: {
          ...kyc,
          status
        }
      }
    }, {
      onError(context) {
        toast.error(context.error.message || "An error occured.")
      },
      onSuccess() {
        toast.error("Kyc Status updated successfully")
        router.refresh()
      }
    })
  }

  return (
    <div>
      <span className="block mb-4 capitalize">Kyc Status: <Badge>{kyc.status}</Badge></span>

      <div className="flex flex-col justify-start w-full gap-3">
        <button
          className='bg-green-500 w-1/2 px-2 py-1 rounded-md'
          onClick={() => handleKyc("approved")}
        >
          Change to Approved
        </button>
        <button
          className='bg-blue-500 w-1/2 px-2 py-1 rounded-md'
          onClick={() => handleKyc("pending")}
        >
          Change to Pending
        </button>
        <button
          className='bg-red-500 w-1/2 px-2 py-1 rounded-md'
          onClick={() => handleKyc("rejected")}
        >
          Change to Rejected
        </button>
      </div>
    </div>
  )
}

export default KycClientButton