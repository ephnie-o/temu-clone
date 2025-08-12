import { imageUrl } from "@/lib/imageUrl";
import { NextResponse } from "next/server"
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";
import type { Product } from "@/sanity.types"

type ProductHit = Pick<Product, "_id" | "name" | "price" | "slug" | "image">
type ItemDTO = {
  id: string
  title: string
  price: number
  slug: string | null
  url: string | null
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ query: string }> }
) {
  const { query } = await ctx.params
  const q = decodeURIComponent(query || "").trim()
  if (!q) return NextResponse.json<ItemDTO[]>([])

  try {
    const products = (await searchProductsByName(q)) as ProductHit[]
    const items: ItemDTO[] = (products ?? []).map((p) => ({
      id: p._id,
      title: p.name ?? "",
      price: typeof p.price === "number" ? p.price : 0,
      slug: p?.slug?.current ?? null,
      url: p?.image ? (imageUrl(p.image).width(40).height(40).fit("crop").url() ?? null) : null,
    }))
    return NextResponse.json(items)
  } catch (err) {
    console.error("search-by-name error:", err)
    return NextResponse.json<ItemDTO[]>([], { status: 500 })
  }
}