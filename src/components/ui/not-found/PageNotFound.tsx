import Link from "next/link";

export default function PageNotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
            {/* Efectos de fondo animados */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 text-center max-w-2xl mx-auto">
                {/* Número 404 con efecto glassmorphism */}
                <div className="relative mb-8">
                    <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse">
                        404
                    </div>
                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-white opacity-10 blur-sm">
                        404
                    </div>
                </div>

                {/* Contenedor glassmorphism */}
                <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
                    <div className="space-y-6">
                        {/* Icono decorativo */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping opacity-20"></div>
                            </div>
                        </div>

                        {/* Título principal */}
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                Página no encontrada
                            </span>
                        </h1>

                        {/* Descripción */}
                        <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-lg mx-auto">
                            Lo sentimos, la página que buscas se perdió.
                        </p>

                        {/* Botones de acción */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/" className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                                <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span>Ir al Inicio</span>
                                </div>
                            </Link>


                        </div>

                        {/* Enlaces adicionales */}
                        <div className="mt-12 pt-8 border-t border-white/20">
                            <p className="text-slate-400 mb-4">¿Necesitas ayuda? Prueba estos enlaces:</p>
                            <div className="flex flex-wrap justify-center gap-4 text-sm">
                                <Link href="/contact" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 hover:underline">
                                    Contacto
                                </Link>
                                <span className="text-slate-600">•</span>
                                <Link href="/help" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 hover:underline">
                                    Ayuda
                                </Link>
                                <span className="text-slate-600">•</span>
                                <Link href="/sitemap" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 hover:underline">
                                    Mapa del sitio
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Partículas flotantes decorativas */}
                <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute top-20 right-20 w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-300 opacity-80"></div>
                <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-700 opacity-70"></div>
                <div className="absolute bottom-32 right-12 w-1 h-1 bg-purple-300 rounded-full animate-bounce delay-1000 opacity-60"></div>
            </div>
        </div>
    );
}