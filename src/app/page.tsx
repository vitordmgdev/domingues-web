"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
    ArrowRight,
    Calendar,
    CircleCheck,
    Hammer,
    Move3D,
    PencilRuler,
    Sparkle,
    SwatchBook,
    Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { TestimonialCard } from "./components/testimonial-card";

export interface Testimonial {
    id: number;
    name: string;
    location: string;
    message: string;
    avatar: string;
    rating: number;
    designation: string;
}

export default function LandingPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        async function fetchTestimonials() {
            const response = await fetch(
                "https://testimonialapi.vercel.app/api",
            );

            const data: Testimonial[] = await response.json();

            setTestimonials(data);
        }

        fetchTestimonials();
    }, []);

    const carouselItems = [
        {
            id: 1,
            src: "https://i.pinimg.com/736x/c7/e3/dc/c7e3dc98375188acf85f961f6a82b315.jpg",
            alt: "Hero",
            title: "Cozinha",
            description:
                "Cozinhas planejadas que unem estética e funcionalidade. Cada centímetro pensado para facilitar sua rotina e valorizar o ambiente.",
        },
        {
            id: 2,
            src: "https://i.pinimg.com/736x/7c/1b/d0/7c1bd052435d2318fdc165c902613323.jpg",
            alt: "Hero",
            title: "Escritórios",
            description:
                "Transformamos espaços em escritorios modernos e funcionais. Dando vida e produtividade ao seu trabalho.",
        },
        {
            id: 3,
            src: "https://i.pinimg.com/736x/7a/d2/3d/7ad23d4472784457754ea7befd7ba9e0.jpg",
            alt: "Hero",
            title: "Quartos de Criança",
            description:
                "Ambientes criativos, seguros e funcionais, que acompanham o crescimento da criança sem virar dor de cabeça no futuro.",
        },
        {
            id: 4,
            src: "https://i.pinimg.com/736x/d6/bd/a1/d6bda159416ad7a6cb50af0787ef885d.jpg",
            alt: "Hero",
            title: "Quarto de Casal",
            description:
                "Conforto, organização e elegância no lugar mais íntimo da casa. Um espaço feito para descansar de verdade.",
        },
        {
            id: 5,
            src: "https://i.pinimg.com/1200x/30/f3/c6/30f3c6b998debac8e7424616f0f4cd88.jpg",
            alt: "sala",
            title: "Sala",
            description:
                "Salas que equilibram design e aconchego, pensadas para receber bem e viver melhor todos os dias.",
        },
        {
            id: 6,
            src: "https://i.pinimg.com/736x/1b/11/8d/1b118db88d1bc80d53c97360b60ae730.jpg",
            alt: "lavanderia",
            title: "Lavanderia",
            description:
                "Lavanderias inteligentes, organizadas e práticas. Funcional até nos mínimos detalhes — porque ninguém merece bagunça.",
        },
        {
            id: 7,
            src: "https://i.pinimg.com/736x/98/49/36/984936a3358e0c8667d3f03862a4ff06.jpg",
            title: "Closet",
            description:
                "Closets sob medida que trazem ordem, praticidade e um toque de sofisticação à sua rotina.",
        },
    ];

    const processSteps = [
        {
            icon: Calendar,
            title: "Agendamento",
            description:
                "Marque um agendamento para um de nossos consultores ir ao local solicitado para fazer uma medição e fazer um orçamento.",
        },
        {
            icon: PencilRuler,
            title: "Medição & Projeto",
            description:
                "Realizamos a medição precisa do ambiente, após entender o que você quer, faremos um projeto para apresentar a você.",
        },
        {
            icon: Hammer,
            title: "Fabricação",
            description:
                "Criamos o plano de corte, cortamos as peças necessárias, as montamos e finalizamos com acabamento impecável para a montagem.",
        },
        {
            icon: Truck,
            title: "Entrega & Montagem",
            description:
                "Entregamos e montamos seus móveis com cuidado e acabamento impecável.",
        },
    ];

    return (
        <div className="layout">
            <main className="flex flex-col gap-10 h-[calc(100dvh-72px)] justify-center lg:justify-between items-center my-20">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col justify-between w-full max-w-2xl">
                        <div className="flex flex-col">
                            <h1
                                className={`text-[clamp(2rem,5vw,2.5rem)] leading-[1.1] font-medium font-sans text-justify`}
                            >
                                Móveis planejados e modulares para quem valoriza
                                qualidade no seu lar.
                            </h1>

                            <p className="text-justify w-[calc(100%-8rem)] mt-4 text-muted-foreground">
                                Somos uma marcenaria que planeja e executa
                                projetos no ramo de móveis, trabalhamos tanto
                                com projetos únicos que atendem necessidades
                                específicas, como projetos de massificação que
                                atendem a demanda do mercado.
                            </p>

                            <div className="flex gap-2 mt-8">
                                <Button
                                    variant="outline"
                                    size="icon-sm"
                                    asChild
                                >
                                    <Link
                                        href="https://www.facebook.com/domingues.marcenaria"
                                        target="_blank"
                                    >
                                        <FaFacebook />
                                    </Link>
                                </Button>

                                <Button
                                    variant="outline"
                                    size="icon-sm"
                                    asChild
                                >
                                    <Link
                                        href="https://www.instagram.com/domingues.marcenaria"
                                        target="_blank"
                                    >
                                        <FaInstagram />
                                    </Link>
                                </Button>

                                <Button
                                    variant="outline"
                                    size="icon-sm"
                                    asChild
                                >
                                    <Link
                                        href="https://wa.me/5547996176231"
                                        target="_blank"
                                    >
                                        <FaWhatsapp />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        <div className="flex w-full justify-between items-center mt-8">
                            <div className="flex gap-4 flex-wrap">
                                <Button
                                    className="w-fit rounded-full group"
                                    variant="default"
                                >
                                    <SwatchBook className="size-4 group-hover:trawnslate-x-1 transition-transform" />
                                    Ir ao Catálogo
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg overflow-hidden">
                        <Image
                            src="https://i.pinimg.com/1200x/ac/2e/05/ac2e05a976cdcfc568e4c7b8aba51be8.jpg"
                            alt="Hero"
                            width={400}
                            height={400}
                        />
                    </div>
                </div>

                <div className="relative flex w-full overflow-hidden group mx-auto max-w-7xl">
                    <div className="absolute left-0 top-0 bottom-0 w-40 z-10 bg-linear-to-r from-background to-transparent pointer-events-none" />

                    <div className="flex shrink-0 animate-marquee gap-6 pr-6 group-hover:paused items-center">
                        {testimonials.map((testimonial) => (
                            <TestimonialCard
                                key={testimonial.id}
                                {...testimonial}
                            />
                        ))}
                    </div>

                    <div
                        className="flex shrink-0 animate-marquee gap-6 pr-6 group-hover:paused items-center"
                        aria-hidden="true"
                    >
                        {testimonials.map((testimonial) => (
                            <TestimonialCard
                                key={testimonial.id}
                                {...testimonial}
                            />
                        ))}
                    </div>

                    <div className="absolute right-0 top-0 bottom-0 w-40 z-10 bg-linear-to-l from-background to-transparent pointer-events-none" />

                    <style jsx>{`
                        @keyframes marquee {
                            0% {
                                transform: translateX(0);
                            }
                            100% {
                                transform: translateX(-100%);
                            }
                        }
                        .animate-marquee {
                            animation: marquee 60s linear infinite;
                        }
                    `}</style>
                </div>
            </main>

            <div className="w-full">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 2000,
                            stopOnInteraction: true,
                        }),
                    ]}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2 cursor-grab active:cursor-grabbing">
                        {carouselItems.map((item) => (
                            <CarouselItem
                                key={item.id}
                                className="pl-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
                            >
                                <div className="group relative aspect-4/5 sm:aspect-square md:aspect-3/5 overflow-hidden rounded-md bg-muted">
                                    <Image
                                        src={item.src}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />

                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-100 transition-opacity duration-300 lg:opacity-0 group-hover:opacity-100" />

                                    <div className="absolute inset-x-0 bottom-0 p-4 text-white translate-y-0 opacity-100 transition-all duration-300 lg:translate-y-4 lg:opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                        <h3 className="text-lg font-normal font-sans text-white mb-2 select-none">
                                            {item.title}
                                        </h3>

                                        <p className="text-sm font-light text-muted select-none">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <div className="flex justify-between items-center mt-8">
                        <div className="flex items-center gap-2">
                            <CarouselPrevious
                                className="static translate-y-0 translate-x-0 cursor-pointer"
                                variant="default"
                            />

                            <CarouselNext
                                className="static translate-y-0 translate-x-0 cursor-pointer"
                                variant="default"
                            />
                        </div>

                        <Button className="rounded-full" asChild>
                            <Link href="/portfolio">
                                Veja o nosso portfolio <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                </Carousel>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center my-6">
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle className="flex gap-2">
                            <Sparkle className="size-4" />
                            Qualidade
                        </CardTitle>

                        <CardDescription>
                            Materiais selecionados, acabamento preciso e atenção
                            a cada detalhe. Nada de improviso. É móvel bem
                            feito, do começo ao fim.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card className="h-fit">
                    <CardHeader className="gap-4">
                        <CardTitle className="flex gap-2">
                            <Move3D className="size-4" />
                            Design 3D
                        </CardTitle>

                        <CardDescription>
                            Todo projeto nasce em 3D. Você visualiza, ajusta e
                            aprova antes da execução. Sem surpresas. Só controle
                            total do resultado.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle className="flex gap-2">
                            <CircleCheck className="size-4 text-muted-foreground" />
                            Durabilidade
                        </CardTitle>

                        <CardDescription>
                            Estrutura pensada pra aguentar o uso real do dia a
                            dia. Móveis feitos para durar anos — não até a
                            próxima tendência.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <div className="flex flex-col w-full">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12021.627101438013!2d-48.589195228559966!3d-26.389536023827045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d937c40d4f6d27%3A0x4ac3f0bbd174a866!2sMD%20M%C3%B3veis%20Planejados!5e0!3m2!1spt-BR!2sbr!4v1767969155923!5m2!1spt-BR!2sbr"
                    className="w-full h-full min-h-[400px] rounded-md"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="eager"
                />
            </div>
        </div>
    );
}
