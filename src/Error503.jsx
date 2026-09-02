import React from 'react';
import { RefreshCcw, ArrowLeft, Server, ServerOff} from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceUnavailable = () => {
  // Sahifani yangilash funksiyasi
  const handleRefresh = () => {
    window.location.reload();
  };

  // Orqaga qaytish yoki Bosh sahifaga o'tish funksiyasi
  const handleGoHome = () => {
    window.location.href = '/';
  };

  // Soxta Netlify Request ID generatsiyasi (haqiqiylik hissini berish uchun)
  const generateRequestId = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return `req_${result}`;
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4 sm:p-6 font-sans text-stone-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden relative"
      >
        {/* Dekorativ tepa qism */}
        <div className="h-2 w-full bg-white"></div>

        <div className="p-8 sm:p-12 md:p-16 text-center">

          {/* Ikonka */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="w-30 h-30 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <ServerOff className="w-10 h-10 text-[#73976A]" />
          </motion.div>

          {/* Sarlavha */}
          <h1 className="text-4xl sm:text-8xl font-extrabold text-stone-900 tracking-tight mb-3">
            503
          </h1>
          <h2 className="text-3xl font-bold text-stone-800 mb-4">
            Service Unavailable
          </h2>

          {/* Netlify standart matni */}
          <p className="text-stone-600 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
            The server is temporarily unable to service your request due to maintenance downtime or capacity problems. Please try again later.
          </p>

          {/* Tugmalar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={handleRefresh}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#73976A] text-white font-semibold rounded-lg hover:bg-[#5e7a56] transition shadow-md flex items-center justify-center gap-2"
            >
              <RefreshCcw className="w-5 h-5" />
              Try Again
            </button>
            <button
              onClick={handleGoHome}
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-stone-800 font-semibold rounded-lg border border-stone-300 hover:bg-stone-50 transition shadow-sm flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Return to Homepage
            </button>
          </div>

          {/* Netlify uslubidagi texnik ma'lumotlar (Footer) */}
          <div className="mt-8 pt-8 border-t border-stone-100 text-left sm:text-center text-sm text-stone-500 flex flex-col sm:flex-row items-center justify-between sm:justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-stone-400" />
              <span>Netlify Edge Routing</span>
            </div>
            <div className="hidden sm:block text-stone-300">•</div>
            <div className="font-mono text-xs bg-stone-100 px-2 py-1 rounded text-stone-500">
              ID: {generateRequestId()}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default ServiceUnavailable;