import { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { 
  Users, 
  Target, 
  BarChart3, 
  Shield, 
  Zap, 
  Heart, 
  CheckCircle, 
  Star,
  Menu,
  X,
  ArrowRight,
  Play,
  Globe,
  Smartphone,
  Mic,
  Volume2,
  Waves,
  Radio
} from 'lucide-react'
import { blink } from '../blink/client'

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
      
      // Se usuário logou, redirecionar para onboarding
      if (state.user && !state.isLoading) {
        onGetStarted()
      }
    })
    return unsubscribe
  }, [onGetStarted])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => heroElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleLogin = () => {
    blink.auth.login()
  }

  const handleCreateAccount = () => {
    if (user) {
      onGetStarted()
    } else {
      setIsLoginModalOpen(true)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-r-2 border-transparent border-t-white border-r-white"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-white/20"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* TESTE - VOXA DESIGN ATIVO */}
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Volume2 className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur opacity-30 animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Voxa
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                Recursos
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                Como Funciona
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                Depoimentos
              </a>
              
              {/* Quick Login Buttons */}
              <div className="flex items-center space-x-3">
                <Button 
                  onClick={handleLogin}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                
                <Button 
                  onClick={handleLogin}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300"
                >
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Apple
                </Button>
              </div>
              
              <Button 
                onClick={handleCreateAccount}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
              >
                Criar Minha Conta
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:bg-white/10"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-6 border-t border-white/10">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                  Recursos
                </a>
                <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  Como Funciona
                </a>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                  Depoimentos
                </a>
                <Button 
                  onClick={handleCreateAccount}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-full rounded-xl font-semibold"
                >
                  Criar Minha Conta
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Interactive Background */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(147, 51, 234, 0.3) 0%, 
              rgba(219, 39, 119, 0.2) 25%, 
              rgba(0, 0, 0, 0.8) 50%),
            linear-gradient(135deg, 
              #0f0f23 0%, 
              #1a0b2e 25%, 
              #16213e 50%, 
              #0f3460 75%, 
              #533483 100%)
          `
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Sound Waves */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 border border-purple-500/20 rounded-full animate-ping"
                  style={{
                    width: `${(i + 1) * 100}px`,
                    height: `${(i + 1) * 100}px`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '3s'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <Badge variant="secondary" className="mb-8 px-6 py-3 text-sm font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300">
                🎙️ Sua Voz na Política
              </Badge>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Dê Voz às Suas
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                  Convicções Políticas
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <strong>Voxa</strong> transforma sua participação política em uma experiência única e personalizada. 
                Configure suas prioridades e monitore políticos que realmente representam seus valores.
              </p>

              <div className="flex flex-col gap-6 justify-center lg:justify-start mb-10">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleCreateAccount}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group"
                  >
                    <Mic className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                    Criar Minha Conta
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    className="px-10 py-6 text-xl font-bold border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 rounded-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Play className="mr-3 h-6 w-6" />
                    Ver Demo
                  </Button>
                </div>
                
                {/* Login Option */}
                <div className="text-center lg:text-left">
                  <p className="text-gray-400 mb-3">Já tem uma conta?</p>
                  <Button 
                    onClick={handleLogin}
                    variant="ghost"
                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 font-semibold underline underline-offset-4 decoration-purple-500/50 hover:decoration-purple-400 transition-all duration-300"
                  >
                    Fazer Login
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-purple-400" />
                  <span>100% Gratuito</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-purple-400" />
                  <span>Setup em 3 min</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-purple-400" />
                  <span>Dados Verificados</span>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-purple-500/20">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-200"></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Radio className="h-5 w-5 text-purple-400 animate-pulse" />
                    <Waves className="h-5 w-5 text-pink-400 animate-bounce" />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">JB</span>
                      </div>
                      <div>
                        <div className="font-bold text-white">João Silva</div>
                        <div className="text-sm text-purple-300">Deputado Federal</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">8.7</div>
                      <div className="text-xs text-gray-400">Voxa Score</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">MS</span>
                      </div>
                      <div>
                        <div className="font-bold text-white">Maria Santos</div>
                        <div className="text-sm text-green-300">Senadora</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">9.2</div>
                      <div className="text-xs text-gray-400">Voxa Score</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-500/20 to-slate-500/20 rounded-2xl border border-gray-500/30 hover:border-gray-400/50 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-slate-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">CA</span>
                      </div>
                      <div>
                        <div className="font-bold text-white">Carlos Alves</div>
                        <div className="text-sm text-gray-300">Vereador</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-gray-400 to-slate-400 bg-clip-text text-transparent">6.4</div>
                      <div className="text-xs text-gray-400">Voxa Score</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white p-4 rounded-2xl shadow-2xl animate-bounce">
                <BarChart3 className="h-8 w-8" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-green-600 to-emerald-600 text-white p-4 rounded-2xl shadow-2xl animate-bounce delay-1000">
                <Target className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Por que Escolher Voxa?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A plataforma mais avançada para dar voz às suas convicções políticas no Brasil
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
                  <Target className="h-10 w-10 text-purple-400" />
                </div>
                <CardTitle className="text-xl text-white">Prioridades Personalizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300">
                  Configure suas prioridades políticas com pesos personalizados. 
                  Veja como cada político se alinha com seus valores específicos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-green-500/20 hover:border-green-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                  <BarChart3 className="h-10 w-10 text-green-400" />
                </div>
                <CardTitle className="text-xl text-white">Voxa Score Dinâmico</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300">
                  Algoritmo inteligente que calcula pontuações em tempo real 
                  baseado nas ações e posicionamentos dos políticos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-pink-500/20 hover:border-pink-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/10">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-pink-500/30">
                  <Users className="h-10 w-10 text-pink-400" />
                </div>
                <CardTitle className="text-xl text-white">Comparação Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300">
                  Compare políticos lado a lado com base em suas prioridades. 
                  Visualize diferenças e tome decisões informadas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-500/20 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/30">
                  <Zap className="h-10 w-10 text-yellow-400" />
                </div>
                <CardTitle className="text-xl text-white">Atualizações em Tempo Real</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300">
                  Receba notificações instantâneas sobre ações dos políticos 
                  que você acompanha. Nunca perca uma informação importante.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                  <Shield className="h-10 w-10 text-blue-400" />
                </div>
                <CardTitle className="text-xl text-white">Transparência Total</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300">
                  Metodologia aberta e fontes verificáveis. 
                  Entenda exatamente como cada pontuação é calculada.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-red-500/20 hover:border-red-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/10">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/30">
                  <Heart className="h-10 w-10 text-red-400" />
                </div>
                <CardTitle className="text-xl text-white">Interface Intuitiva</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300">
                  Design moderno e responsivo que funciona perfeitamente 
                  em qualquer dispositivo. Experiência otimizada para mobile.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Como Funciona em 3 Passos
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Configure sua voz política personalizada em poucos minutos
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Configure Suas Prioridades</h3>
              <p className="text-gray-300 leading-relaxed">
                Defina o que é mais importante para você: educação, saúde, economia, 
                meio ambiente e muito mais. Atribua pesos personalizados para cada área.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Selecione Políticos</h3>
              <p className="text-gray-300 leading-relaxed">
                Escolha os políticos que deseja acompanhar. Nossa base de dados 
                inclui deputados, senadores, governadores e prefeitos de todo o Brasil.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Monitore e Compare</h3>
              <p className="text-gray-300 leading-relaxed">
                Acompanhe Voxa Scores personalizados, receba atualizações em tempo real 
                e compare políticos com base em suas prioridades específicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                O que Nossos Usuários Dizem
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Milhares de brasileiros já usam Voxa para dar voz às suas convicções políticas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">
                  "Finalmente posso acompanhar a política de forma organizada e personalizada. 
                  Voxa me ajuda a entender quais políticos realmente defendem minhas causas."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">AS</span>
                  </div>
                  <div>
                    <div className="font-bold text-white">Ana Silva</div>
                    <div className="text-sm text-gray-400">Professora, São Paulo</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-green-500/20 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">
                  "A transparência da metodologia me dá confiança nos dados. 
                  Consigo comparar candidatos de forma objetiva e tomar decisões mais informadas."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">RC</span>
                  </div>
                  <div>
                    <div className="font-bold text-white">Roberto Costa</div>
                    <div className="text-sm text-gray-400">Empresário, Rio de Janeiro</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-pink-500/20 hover:border-pink-400/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">
                  "Interface super intuitiva e funciona perfeitamente no celular. 
                  Recebo notificações importantes e nunca mais perco uma votação relevante."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">MF</span>
                  </div>
                  <div>
                    <div className="font-bold text-white">Marina Ferreira</div>
                    <div className="text-sm text-gray-400">Estudante, Brasília</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            Pronto para Dar Voz às Suas Convicções?
          </h2>
          <p className="text-xl text-purple-100 mb-10 leading-relaxed">
            Junte-se a milhares de brasileiros que já usam <strong>Voxa</strong> 
            para se manterem informados e engajados na política.
          </p>
          <Button 
            onClick={handleCreateAccount}
            size="lg"
            className="bg-white text-purple-900 hover:bg-gray-100 px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 rounded-2xl"
          >
            <Mic className="mr-3 h-6 w-6" />
            Criar Minha Conta Gratuitamente
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
          <p className="text-purple-200 mt-6 text-sm">
            Configuração em 3 minutos • 100% Gratuito • Sem cartão de crédito
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Volume2 className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Voxa
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                A plataforma mais avançada para dar voz às suas convicções políticas no Brasil.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-6 text-white">Produto</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Como Funciona</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-6 text-white">Empresa</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-6 text-white">Suporte</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Voxa. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-900 to-black border-purple-500/30">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-white">
              Entrar no Voxa
            </DialogTitle>
            <DialogDescription className="text-center text-gray-300">
              Faça login para começar a dar voz às suas convicções políticas
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Button 
              onClick={handleLogin}
              className="w-full bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 py-4 text-lg font-semibold shadow-lg rounded-xl transition-all duration-300 hover:scale-105"
            >
              <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar com Google
            </Button>
            
            <Button 
              onClick={handleLogin}
              className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-semibold border border-gray-600 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <svg className="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Continuar com Apple
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">ou</span>
              </div>
            </div>
            
            <Button 
              onClick={handleLogin}
              variant="outline"
              className="w-full py-4 text-lg font-semibold border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 rounded-xl transition-all duration-300"
            >
              <Shield className="mr-2 h-5 w-5" />
              Entrar com Email
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.
              O login é seguro e seus dados são protegidos.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}