import { imageUrl } from "@/lib/imageUrl";
import { NextResponse } from "next/server"
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ query: string }> }
) {
  const { query } = await ctx.params
  const q = decodeURIComponent(query || "").trim()
  if (!q) return NextResponse.json([])

  try {
    const products: any[] = await searchProductsByName(q)
    const items = (products || []).map((p: any) => ({
      id: p._id,
      title: p.name,
      price: typeof p.price === "number" ? p.price : 0,
      slug: p?.slug?.current ?? null,
      url: p?.image ? imageUrl(p.image).width(40).height(40).fit("crop").url() : null,
    }))
    return NextResponse.json(items)
  } catch (err) {
    console.error("search-by-name error:", err)
    return NextResponse.json([], { status: 500 })
  }
}