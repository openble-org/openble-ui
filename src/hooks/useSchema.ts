import { useEffect, useState } from "react";
import { parseSchema, ParsedSchema } from '@openble/openble-sdk'
import rawSchema from '../openble/spec.openble.json'

export default function useSchema(): ParsedSchema | undefined {
  const  [schema, setSchema] = useState<ParsedSchema>()

  useEffect(() => {
    try {
      const parsedSchema = parseSchema(rawSchema)
      setSchema(parsedSchema)
    } catch (error) {
      console.error('Parse schema error', error)
    }
  }, [])

  return schema
}