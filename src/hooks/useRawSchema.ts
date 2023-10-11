import { useEffect, useState } from "react";

export default function useRawSchema(): string | undefined {
  const [schema, setSchema] = useState<string>()
  useEffect(() => {
    async function readYamlSchema() {
      const resp = await fetch('/spec.openble.yaml')
      const file = await resp.text()

      console.log('got file', file)
      setSchema(file)
    }

    readYamlSchema()
  }, [])

  return schema
}