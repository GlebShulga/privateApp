import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
 
export const runtime = 'edge'

// Page configurations
const pageConfigs = {
  home: {
    title: 'Gleb Shulga',
    subtitle: 'Frontend Developer',
    description: 'React • Next.js • TypeScript • 5+ years experience',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    showAvatar: true,
  },
  '3d-text': {
    title: '3D Text',
    subtitle: 'Interactive Three.js Experience',
    description: 'Explore 3D typography with WebGL rendering, orbital controls, and dynamic lighting',
    background: 'linear-gradient(135deg, #16213e 0%, #0f3460 50%, #16213e 100%)',
    showAvatar: false,
  },
  hobby: {
    title: 'Creative Projects',
    subtitle: 'Gleb Shulga',
    description: 'Exploring creative coding, 3D graphics, and interactive experiences',
    background: 'linear-gradient(135deg, #2E3440 0%, #3B4252 50%, #434C5E 100%)',
    showAvatar: true,
  },
  experience: {
    title: 'Professional Experience',
    subtitle: 'Gleb Shulga',
    description: 'Frontend Developer with 5+ years at IMMIGRANT INVEST & EPAM Systems',
    background: 'linear-gradient(135deg, #4C566A 0%, #5E81AC 100%)',
    showAvatar: true,
  },
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || 'home'
    
    const config = pageConfigs[page as keyof typeof pageConfigs] || pageConfigs.home

    return new ImageResponse(
      (
        <div
          style={{
            background: config.background,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, system-ui, sans-serif',
            position: 'relative',
          }}
        >
          {/* Geometric background elements for 3d-text */}
          {page === '3d-text' && (
            <>
              <div
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '10%',
                  width: '120px',
                  height: '120px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '60px',
                  transform: 'rotate(45deg)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '15%',
                  right: '15%',
                  width: '80px',
                  height: '80px',
                  background: 'rgba(102, 126, 234, 0.3)',
                  transform: 'rotate(30deg)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '20%',
                  right: '20%',
                  width: '60px',
                  height: '60px',
                  border: '2px solid rgba(118, 75, 162, 0.4)',
                  borderRadius: '50%',
                }}
              />
            </>
          )}
          
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: config.showAvatar ? '40px' : '0',
              padding: '40px',
              flexDirection: config.showAvatar ? 'row' : 'column',
              textAlign: config.showAvatar ? 'left' : 'center',
            }}
          >
            {config.showAvatar && (
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '100px',
                  backgroundImage: 'url(https://shulga.vercel.app/assets/portrait_light.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '4px solid white',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                }}
              />
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                color: 'white',
                maxWidth: '600px',
              }}
            >
              <h1
                style={{
                  fontSize: page === '3d-text' ? '72px' : '48px',
                  fontWeight: '700',
                  margin: '0 0 16px 0',
                  lineHeight: '1.1',
                  background: page === '3d-text' 
                    ? 'linear-gradient(135deg, #ffffff 0%, #667eea 50%, #764ba2 100%)'
                    : 'none',
                  backgroundClip: page === '3d-text' ? 'text' : 'none',
                  WebkitBackgroundClip: page === '3d-text' ? 'text' : 'none',
                  color: page === '3d-text' ? 'transparent' : 'white',
                  textShadow: page === '3d-text' ? '0 0 30px rgba(255, 255, 255, 0.3)' : 'none',
                }}
              >
                {config.title}
              </h1>
              <p
                style={{
                  fontSize: page === '3d-text' ? '32px' : '28px',
                  fontWeight: '400',
                  margin: '0 0 16px 0',
                  opacity: 0.9,
                }}
              >
                {config.subtitle}
              </p>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: '300',
                  margin: '0',
                  opacity: 0.8,
                  lineHeight: '1.3',
                }}
              >
                {config.description}
              </p>
              {page === '3d-text' && (
                <div
                  style={{
                    display: 'flex',
                    gap: '20px',
                    marginTop: '30px',
                    fontSize: '16px',
                    opacity: 0.6,
                    justifyContent: 'center',
                  }}
                >
                  <span>Three.js</span>
                  <span>•</span>
                  <span>WebGL</span>
                  <span>•</span>
                  <span>Interactive</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.error('Error generating og image:', e)
    return new Response('Failed to generate og image', {
      status: 500,
    })
  }
}