import { Timestamp, } from "@firebase/firestore";

interface Post {
  time: Timestamp
  post: string
}

export interface PostId extends Post {
  id: string
}
