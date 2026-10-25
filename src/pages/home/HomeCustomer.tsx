import type { UserData } from '@/models/userData'

import MobileLink from '../../components/commons/MobileLink'
import ProductInfoCard from '../../components/commons/ProductInfoCard'
import PromoCard from '../../components/commons/PromoCard'
import ProfessionalInfoCard from '../../components/commons/ProfessionalInfoCard'
import HomeHeader from '../../components/pages/home/HomeHeader'

const HomeCustomer = ({data}: {data: UserData}) => {

  return (
    <div className="w-full min-h-dvh animateLeft">
      <HomeHeader data={data} />

      <MobileLink title="Produtos" link="Ver todos >" className="mt-5 px-6"/>

      <div className="px-6 mt-5 flex flex-col gap-3">
        <div className="flex flex-row gap-3">
          <ProductInfoCard product='Esmaltaçao' desc='a partir R$95' />
          <ProductInfoCard product='Esmaltaçao' desc='a partir R$95' />
          <ProductInfoCard product='Esmaltaçao' desc='a partir R$95' />
        </div>

        <div className="flex flex-row gap-3">
          <ProductInfoCard product='Esmaltaçao' desc='a partir R$95' />
          <ProductInfoCard product='Esmaltaçao' desc='a partir R$95' />
          <ProductInfoCard product='Esmaltaçao' desc='a partir R$95' />
        </div>
      </div>

      <PromoCard promo="Mani + Pedi com 15% off" cupom="SICH10" data="31/12/2024" className="mt-6 mx-6"/>

      <MobileLink title="Profissionais em alta" link="Ver todos >" className="mt-5 px-6"/>

      <div className="px-6 mt-5 flex flex-col gap-3 mb-5">
        <ProfessionalInfoCard name='Ana Beatriz' url=''/>
         
        <ProfessionalInfoCard name='Carlos Silva' url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcvCvrhqSV6XXx9-KRvCqAEyjmTqtDERQqt1ZNPRdg5g&s=10"/>
        
        <ProfessionalInfoCard name='Maria Oliveira'/>
      </div>
      
    </div>
  )
}

export default HomeCustomer
