interface Parameters {
  operation: 'create' | 'update' | 'delete'
  key: string
  value: boolean
}

export const edgeConfig = async ({ operation, key, value }: Parameters) => {
  try {
    const updateEdgeConfig = await fetch(
      `https://api.vercel.com/v1/edge-config/${process.env.VERCEL_EDGE_CONFIG_ID}/items`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              operation,
              key,
              value,
            },
          ],
        }),
      },
    )
    const result = await updateEdgeConfig.json()
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
