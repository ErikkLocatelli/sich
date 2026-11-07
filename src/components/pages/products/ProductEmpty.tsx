import Card from "@/components/commons/Card"
import SubTitle from "@/components/commons/SubTitle"
import { cn } from "@/lib/utils"
import ProductInfoCardEmpty from "./ProductInfoCardEmpty"

const ProductEmpty = ({ className }: { className?: string }) => {
    return (
        <Card className={cn("mt-4 p-6", className)}>
            <div className="flex flex-col items-center gap-4">
                <SubTitle text="Seus serviços começam aqui!" />
                <p className="text-[11px] text-muted-foreground text-center">
                    Cadastre seus serviços, defina preços e duração deixando todo seu catálogo organizado em um só lugar.
                </p>

                <ProductInfoCardEmpty />

                <p className="text-[11px] text-muted-foreground text-center">Cadastre agora mesmo o seu primeiro serviço na <span className="font-bold text-sich-magenta">SICH</span> gratuitamente</p>
            </div>
        </Card>
    )
}

export default ProductEmpty
