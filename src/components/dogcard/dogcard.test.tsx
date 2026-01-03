import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DogCard from './dogcard'

// Helper to mock a fetch and validate the expected endpoint
function mockFetchOnce(urlExpected: string, imageUrl: string) {
    const json = () => Promise.resolve({ message: imageUrl })
    const response = { ok: true, status: 200, json } as Response

    const fetchMock = vi.fn((input: RequestInfo | URL) => {
        expect(String(input)).toBe(urlExpected)
        return Promise.resolve(response)
    })

    vi.stubGlobal('fetch', fetchMock)
    return fetchMock
}

beforeEach(() => {
    vi.unstubAllGlobals()
    vi.resetAllMocks()
})

afterEach(() => {
    vi.unstubAllGlobals()
})

describe('DogCard', () => {
    it('cuando subbreed === "" muestra "Cargando imagen..." y luego la imagen de la raza', async () => {
        const breed = 'husky'
        const subbreed = ''
        const expectedUrl = `https://dog.ceo/api/breed/${breed}/images/random`
        const imageUrl = 'https://images.dog.ceo/breeds/husky/n02110185_1469.jpg'

        const fetchMock = mockFetchOnce(expectedUrl, imageUrl)

        render(<DogCard breed={breed} subbreed={subbreed} />)
        expect(screen.getByText(/Cargando imagen/i)).toBeInTheDocument()

        const img = await screen.findByRole('img')
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', imageUrl)

        // alt concatenates "subbreed breed"; if subbreed is empty, validate only breed
        expect(img.getAttribute('alt') ?? '').toMatch(new RegExp(breed, 'i'))

        const title = screen.getByRole('heading', { level: 3 })
        expect(title).toHaveTextContent(breed)

        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(screen.queryByText(/Cargando imagen/i)).not.toBeInTheDocument()
    })

    it('cuando subbreed !== "" usa el endpoint de sub-raza y muestra "subbreed breed" en el título', async () => {
        const breed = 'poodle'
        const subbreed = 'mini'
        const expectedUrl = `https://dog.ceo/api/breed/${breed}/${subbreed}/images/random`
        const imageUrl = 'https://images.dog.ceo/breeds/poodle-mini/abc123.jpg'

        const fetchMock = mockFetchOnce(expectedUrl, imageUrl)

        render(<DogCard breed={breed} subbreed={subbreed} />)
        expect(screen.getByText(/Cargando imagen/i)).toBeInTheDocument()

        const img = await screen.findByRole('img')
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', imageUrl)
        expect(img.getAttribute('alt') ?? '').toMatch(new RegExp(`${subbreed}\\s+${breed}`, 'i'))

        const title = screen.getByRole('heading', { level: 3 })
        expect(title).toHaveTextContent(new RegExp(`${subbreed}\\s+${breed}`, 'i'))

        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(screen.queryByText(/Cargando imagen/i)).not.toBeInTheDocument()
    })

    it('si fetch falla, mantiene "Cargando imagen..." (no hay imagen)', async () => {
        const breed = 'beagle'
        const subbreed = ''

        const fetchMock = vi.fn(() => Promise.reject(new Error('Network error')))
        vi.stubGlobal('fetch', fetchMock)

        render(<DogCard breed={breed} subbreed={subbreed} />)

        const loading = await screen.findByText(/Cargando imagen/i)
        expect(loading).toBeInTheDocument()
        expect(fetchMock).toHaveBeenCalledTimes(1)
    })
})
