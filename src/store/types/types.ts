export type PostType = {
  userId: number
  id: number
  title: string
  body: string
}

export type SortOption = {
  value: string
  name: string
}

export type PostState = {
  posts: PostType[]
  isLoading: boolean
  selectedSort: string
  searchQuery: string
  page: number
  limit: number
  totalPages: number
  sortOptions: SortOption[]
  newPostsLoading: boolean
}
