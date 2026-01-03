import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'

// *** Mock package file-saver ***
vi.mock('file-saver', () => ({ saveAs: vi.fn() }))
import { saveAs } from 'file-saver'

import DogDetail from './dogdetail'

// Helper to visualize the current route and assert redirects
function LocationDisplay() {
    const location = useLocation()
    return <div data-testid="location">{location.pathname}</div>
}

// Helper to mock fetch and validate the expected endpoint
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

function setStorage(breed: string, subbreed: string) {
    localStorage.setItem('breed', breed)
    localStorage.setItem('subbreed', subbreed)
}

beforeEach(() => {
    localStorage.clear()
    vi.resetAllMocks()
    vi.unstubAllGlobals()
})

afterEach(() => {
    vi.unstubAllGlobals()
    localStorage.clear()
})

describe('DogDetail', () => {
    it('redirecciona a /home cuando breed === ""', async () => {
        setStorage('', '')

        render(
            <MemoryRouter initialEntries={["/detail"]}>
                <LocationDisplay />
                <DogDetail />
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByTestId('location')).toHaveTextContent('/home')
        })
    })

    it('cuando subbreed === "" obtiene imagen de la raza y muestra botón de descarga con nombre breed.jpg', async () => {
        const breed = 'husky'
        const subbreed = ''
        const expectedUrl = `https://dog.ceo/api/breed/${breed}/images/random`
        const imageUrl = 'https://images.dog.ceo/breeds/husky/n02110185_1469.jpg'

        setStorage(breed, subbreed)
        const fetchMock = mockFetchOnce(expectedUrl, imageUrl)

        const user = userEvent.setup()

        render(
            <MemoryRouter initialEntries={["/detail"]}>
                <DogDetail />
            </MemoryRouter>
        )

        // Initial loading state
        expect(screen.getByText(/Cargando imagen/i)).toBeInTheDocument()

        // Loaded image
        const img = await screen.findByRole('img')
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', imageUrl)
        // alt must contain at least the breed
        expect(img.getAttribute('alt') ?? '').toMatch(/husky/i)

        // Headings
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Raza:\s*husky/i)
        expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument()

        // Download Image -> filename "husky.jpg"
        const btn = screen.getByRole('button', { name: /Descargar Imagen/i })
        await user.click(btn)
        expect(saveAs).toHaveBeenCalledWith(imageUrl, 'husky.jpg')

        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(screen.queryByText(/Cargando imagen/i)).not.toBeInTheDocument()
    })

    it('cuando subbreed !== "" usa endpoint de subraza y descarga como "subbreed-breed.jpg"', async () => {
        const breed = 'poodle'
        const subbreed = 'mini'
        const expectedUrl = `https://dog.ceo/api/breed/${breed}/${subbreed}/images/random`
        const imageUrl = 'https://images.dog.ceo/breeds/poodle-mini/abc123.jpg'

        setStorage(breed, subbreed)
        const fetchMock = mockFetchOnce(expectedUrl, imageUrl)

        const user = userEvent.setup()

        render(
            <MemoryRouter initialEntries={["/detail"]}>
                <DogDetail />
            </MemoryRouter>
        )

        const img = await screen.findByRole('img')
        expect(img).toHaveAttribute('src', imageUrl)
        expect(img.getAttribute('alt') ?? '').toMatch(/mini\s+poodle/i)

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Raza:\s*poodle/i)
        expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(/Subraza:\s*mini/i)

        const btn = screen.getByRole('button', { name: /Descargar Imagen/i })
        await user.click(btn)
        expect(saveAs).toHaveBeenCalledWith(imageUrl, 'mini-poodle.jpg')

        expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    it('si fetch falla, permanece el estado de carga y no se descarga', async () => {
        const breed = 'beagle'
        const subbreed = ''
        setStorage(breed, subbreed)

        const fetchMock = vi.fn(() => Promise.reject(new Error('Network error')))
        vi.stubGlobal('fetch', fetchMock)

        render(
            <MemoryRouter initialEntries={["/detail"]}>
                <DogDetail />
            </MemoryRouter>
        )

        const loading = await screen.findByText(/Cargando imagen/i)
        expect(loading).toBeInTheDocument()
        expect(fetchMock).toHaveBeenCalledTimes(1)

        expect(saveAs).not.toHaveBeenCalled()
    })
})
