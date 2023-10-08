import { useEffect, useState } from "react";
import { ParsedSchema } from "../lib/parsedSchema";
import { parseSchema } from "../lib";

export default function useSchema(): ParsedSchema | undefined {
  const  [schema, setSchema] = useState<ParsedSchema>()

  useEffect(() => {
    try {
      const parsedSchema = parseSchema()
      setSchema(parsedSchema)
    } catch (error) {
      console.error('Parse schema error', error)
    }
  }, [])

  return schema
}