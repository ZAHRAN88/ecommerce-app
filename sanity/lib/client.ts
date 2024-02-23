import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: "skwpx2ohXmYEPXkaOatHcWTkQpx9iWqBYa0Gi5y7b2iF5dUN44g7dMytajMA1mGGqu6JtVlaJAriDPKiR0uyRrejzXyDSkF143cgOJQhqXXfHV610lZvQh0QmwTJPHTgnGJVekJp27aAHvgXnzx2CMpBWQfzn2kSkehV6uBUxV8b9HVzz20H",
})
