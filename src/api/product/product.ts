import { API_URL } from "../api"

export type CategoryResponse = {
  id: number
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
}

export type ProductRequest = {
  categoryId: number
  name: string
  description: string | null
  price: number
  duration: string
}

export type ProductImageResponse = {
  id: number
  image: string
  createdAt: string
}

export type ProductResponse = {
  id: number
  categoryId: number
  categoryName: string
  name: string
  description: string | null
  price: number
  duration: string
  durationMinutes: number
  active: boolean
  images: ProductImageResponse[]
  createdAt: string
  updatedAt: string
}

export const CATEGORIES_GET = (token: string) => {
  return {
    url: API_URL + "categories",
    options: {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
        }
    }
  }
}

export const PRODUCTS_GET = (token: string) => {
  return {
    url: API_URL + "providers/me/products",
    options: {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
        }
    }
  }
}

export const PRODUCT_GET = (token: string, productId: number) => {
  return {
    url: API_URL + `providers/me/products/${productId}`,
    options: {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }
}

export const PRODUCT_PUT = (token: string, productId: number, body: ProductRequest) => {
  return {
    url: API_URL + `providers/me/products/${productId}`,
    options: {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    }
  }
}
export const PRODUCT_POST = (token: string, body: ProductRequest) => {
  return {
    url: API_URL + "providers/me/products",
    options: {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    }
  }
}

export const PRODUCT_STATUS_PUT = (token: string, productId: number, active: boolean) => {
  return {
    url: API_URL + `providers/me/products/${productId}/status`,
    options: {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ active })
    }
  }
}

export const PRODUCT_DELETE = (token: string, productId: number) => {
  return {
    url: API_URL + `providers/me/products/${productId}`,
    options: {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }
}

export const IMAGE_POST = (token: string, productId: number, image: string) => {{
    return {
      url: API_URL + `providers/me/products/${productId}/images`,
      options: {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ image })
      }
    }
  }}

export const IMAGE_DELETE = (token: string, productId: number, imageId: number) => {{
    return {
      url: API_URL + `providers/me/products/${productId}/images/${imageId}`,
      options: {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
   }
 }
}

