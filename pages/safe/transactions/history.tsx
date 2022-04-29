import { type SyntheticEvent } from 'react'
import TxList from '@/components/transactions/TxList'
import type { NextPage } from 'next'
import { useAppDispatch } from '@/store'
import { setPageUrl } from '@/store/txHistorySlice'
import useTxHistory from '@/services/useTxHistory'

const History: NextPage = () => {
  const { page, pageUrl } = useTxHistory()
  const dispatch = useAppDispatch()

  const onPageChange = (url?: string) => {
    dispatch(setPageUrl(url))
  }

  const onNext = (e: SyntheticEvent) => {
    e.preventDefault()
    onPageChange(page.next)
  }

  const onPrev = (e: SyntheticEvent) => {
    e.preventDefault()
    onPageChange(page.previous)
  }

  const onFirst = (e: SyntheticEvent) => {
    e.preventDefault()
    onPageChange(undefined)
  }

  return (
    <main>
      <h2>Transaction History</h2>

      <button onClick={onFirst} disabled={!pageUrl}>
        Go to first page
      </button>
      <button onClick={onPrev} disabled={!page.previous}>
        ← Previous page
      </button>
      <button onClick={onNext} disabled={!page.next}>
        Next page →
      </button>

      <TxList items={page.results} />
    </main>
  )
}

export default History