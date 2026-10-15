import type { UseFormReturn } from '@/hooks/useForm'

import useServiceImages from '@/hooks/useServiceImages'

import Card from '../../components/commons/Card'
import Input from '../../components/form/Input'
import Select from '../../components/form/Select'
import Error from '../../components/commons/Error'
import MoneyInput from '@/components/form/MoneyInput'

import { Button } from '../../components/ui/button'
import { Textarea } from '../../components/ui/textarea'
import { Field, FieldGroup, FieldLabel  } from '../../components/ui/field'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

import { Clock, Banknote,  BriefcaseBusiness, ListSortDescending, ImageUp, Trash} from 'lucide-react';


type ServiceFormProps = {
  form: {
    fields: {
      name: UseFormReturn
      category: UseFormReturn
      duration: UseFormReturn
      price: UseFormReturn
      description: UseFormReturn
    }
  }
  images: ReturnType<typeof useServiceImages>
}

const ServiceForm = ({form, images}: ServiceFormProps ) => {
  const { fields } = form;

  const allImages = [
    ...images.existingImages.map(image => ({
        key: `existing-${image.id}`,
        url: image.url,
        onRemove: () => images.removeExistingImage(image.id),
    })),
    ...images.newImages.map(image => ({
        key: image.url,
        url: image.url,
        onRemove: () => images.removeNewImage(image.url),
    })),
   ]
  
  return (
     <Field className="mt-3.5 mb-3.5 flex flex-col gap-5 px-5">
        <Input label="Nome do serviço" placeholder="Digite o nome do serviço" icon={BriefcaseBusiness} value={fields.name.value} error={fields.name.error} onBlur={fields.name.onBlur} onChange={fields.name.onChange}/>

        <Select label="Categoria" id="category" placeholder="Selecione a categoria" icon={ListSortDescending} insideLabel="Serviços" data={[{ name: 'Manicure' }, { name: 'Pedicure' }, { name: 'Massagem' }]} getKey={(item) => item.name} getValue={(item) => item.name} getLabel={(item) => item.name} value={fields.category.value} error={fields.category.error} onValueChange={fields.category.setValue}/>

        <FieldGroup className="flex flex-row gap-2.5">
                <Input label="Duração" placeholder="1h00" icon={Clock} value={fields.duration.value} error={fields.duration.error} onBlur={fields.duration.onBlur} onChange={fields.duration.onChange}/>

                <MoneyInput label="Preço" placeholder="R$ 100,00" icon={Banknote} value={fields.price.value} error={fields.price.error} onBlur={fields.price.onBlur} onChange={fields.price.setValue}/>
        </FieldGroup>

        <Field>
            <FieldLabel className="text-[11px]" htmlFor="textarea">Descrição</FieldLabel>

            <Textarea placeholder="Digite uma descrição para o serviço" className="resize-none rounded-[16px] border-sich-border bg-white text-[11px]" id="textarea" value={fields.description.value} onBlur={fields.description.onBlur} onChange={fields.description.onChange}/>

            {fields.description.error && <Error message={fields.description.error} className='animateDown' />}
        </Field>

        <Input
            label="Imagens"
            placeholder="Selecione imagens para o serviço"
            type="file"
            icon={ImageUp}
            accept="image/*"
            disabled={!images.canAddImages}
            onChange={(event) => {
                if (event.target.files) {
                images.addImages(event.target.files)
                event.target.value = ''
                }
            }}
            />

        {allImages.length > 0 && (
         <Carousel opts={{ loop: true, }} className="w-full max-w-50 m-auto animateLeft">
            <CarouselContent>
                {allImages.map(image => (
                    <CarouselItem key={image.key} className="basis-1/1">
                        <Card className="relative overflow-hidden group">
                            <img
                            src={image.url}
                            alt="Imagem do serviço"
                            className="block aspect-square w-full object-cover transition duration-300 group-hover:brightness-50 group-hover:blur-[2px]"
                            />
                            <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                onClick={image.onRemove}
                                >
                            <Trash className="size-4" />
                            </Button>
                        </Card>
                    </CarouselItem>
                ))}
                </CarouselContent>
            {allImages.length > 1 && <CarouselPrevious className="animateLeft" />}
            {allImages.length > 1 && <CarouselNext className="animateRight" />}
        </Carousel>
        )}
    </Field>
  )
}

export default ServiceForm
