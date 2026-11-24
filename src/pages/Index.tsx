import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Indicadores from '@/components/Indicadores'
import PesoDaVenda from '@/components/PesoDaVenda'
import AlertaComercial from '@/components/AlertaComercial'
import Decisoes from '@/components/Decisoes'
import Sinais from '@/components/Sinais'
import ComoFunciona from '@/components/ComoFunciona'
import Resultados from '@/components/Resultados'
import Conducao from '@/components/Conducao'
import Futuro from '@/components/Futuro'
import QuemConduz from '@/components/QuemConduz'
import Faq from '@/components/Faq'
import FormSection from '@/components/FormSection'
import Footer from '@/components/Footer'

export default function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Indicadores />
        <PesoDaVenda />
        <AlertaComercial />
        <Decisoes />
        <Sinais />
        <ComoFunciona />
        <Resultados />
        <Conducao />
        <Futuro />
        <QuemConduz />
        <Faq />
        <FormSection />
      </main>
      <Footer />
    </>
  )
}
