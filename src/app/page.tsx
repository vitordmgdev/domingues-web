"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Home() {
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

    return (
        <section className="layout">
            <main className="flex flex-col lg:flex-row h-[75dvh] justify-center lg:justify-between items-center">
                <div className="flex flex-col justify-between h-full w-full max-w-2xl py-32">
                    <div className="flex flex-col">
                        <Badge className="h-fit font-normal">
                            São Francisco do Sul, Praia do Ervino
                        </Badge>

                        <h1
                            className={`text-[clamp(2rem,5vw,2.5rem)] leading-[1.1] font-medium font-sans text-justify mt-6`}
                        >
                            Móveis planejados sob medida para quem valoriza o
                            melhor.
                        </h1>

                        <p className="text-justify w-[calc(100%-8rem)] mt-4 text-muted-foreground">
                            Somos uma marcenaria que planeja e executa projetos
                            no ramo de móveis, trabalhamos tanto com projetos
                            únicos que atendem necessidades específicas, como
                            projetos de massificação que atendem a demanda do
                            mercado.
                        </p>

                        <div className="flex gap-2 mt-8">
                            <Button variant="outline" size="icon-sm" asChild>
                                <Link
                                    href="https://www.facebook.com/domingues.marcenaria"
                                    target="_blank"
                                >
                                    <FaFacebook />
                                </Link>
                            </Button>

                            <Button variant="outline" size="icon-sm" asChild>
                                <Link
                                    href="https://www.instagram.com/domingues.marcenaria"
                                    target="_blank"
                                >
                                    <FaInstagram />
                                </Link>
                            </Button>

                            <Button variant="outline" size="icon-sm" asChild>
                                <Link
                                    href="https://wa.me/5547999999999"
                                    target="_blank"
                                >
                                    <FaWhatsapp />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="flex w-full justify-between items-center">
                        <div className="flex gap-4 flex-wrap">
                            <Button
                                className="w-fit rounded-full"
                                variant="outline"
                                asChild
                            >
                                <Link href="/loja">
                                    <ShoppingBasket /> Loja Virtual
                                </Link>
                            </Button>

                            <Button
                                className="w-fit rounded-full group"
                                variant="default"
                            >
                                <FaWhatsapp className="size-4 group-hover:trawnslate-x-1 transition-transform" />
                                Solicite agora um orçamento
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
            </main>

            <div className="w-full py-20">
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
                    <div className="flex items-center justify-between gap-2 mb-8">
                        <h2 className="text-4xl font-medium tracking-tight">
                            Ambientes que valorizam o seu lar
                        </h2>

                        <div className="flex items-center gap-2">
                            <CarouselPrevious
                                className="static translate-y-0 translate-x-0"
                                variant="default"
                            />

                            <CarouselNext
                                className="static translate-y-0 translate-x-0"
                                variant="default"
                            />
                        </div>
                    </div>

                    <CarouselContent className="-ml-4 cursor-grab active:cursor-grabbing">
                        {carouselItems.map((item) => (
                            <CarouselItem
                                key={item.id}
                                className="pl-6 md:basis-1/2 lg:basis-1/3"
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
                                        <h3 className="text-xl font-normal font-sans text-white mb-2 select-none">
                                            {item.title}
                                        </h3>

                                        <p className="text-sm font-normal text-gray-200 select-none">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className="flex justify-end">
                    <Button className="mt-6 rounded-full" asChild>
                        <Link href="/portfolio">
                            Veja o nosso portfolio <ArrowRight />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
