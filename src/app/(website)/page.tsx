"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Hammer, PencilRuler, SwatchBook, Truck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ScrollBackToTop } from "./components/scroll-back-to-top";

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

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 72);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

    const socialMediaLinks = [
        {
            href: "https://www.facebook.com/domingues.marcenaria",
            icon: FaFacebook,
        },
        {
            href: "https://www.instagram.com/domingues.marcenaria",
            icon: FaInstagram,
        },
        {
            href: "https://wa.me/5547996176231",
            icon: FaWhatsapp,
        },
    ];

    return (
        <>
            <ScrollBackToTop />

            <section
                id="home"
                className={`w-full relative overflow-hidden h-screen min-h-[500px] lg:h-[calc(100vh-4rem)]`}
            >
                <div className="relative h-full overflow-hidden lg:rounded-b-[2rem]">
                    <div className="absolute inset-0 bg-black/60 z-1" />

                    <div className="object-cover select-none bg-fixed bg-[url('https://i.imgur.com/DT5SwbG.jpeg')] bg-center bg-cover w-full h-full" />
                </div>

                <div className="flex flex-col-reverse items-start justify-center lg:flex-row lg:items-center lg:justify-between absolute inset-0 mx-auto w-[calc(100%-4rem)] max-w-5xl z-2">
                    <div className="max-w-lg">
                        <div className="flex flex-col gap-8">
                            <div className="flex gap-2">
                                <Badge>
                                    São Francisco do Sul, Santa Catarina
                                </Badge>
                            </div>

                            <h1 className="text-[clamp(2rem,5vw,2.5rem)] leading-[1.1] font-medium font-geist text-justify text-white">
                                Móveis planejados e modulares para quem valoriza
                                qualidade no seu lar.
                            </h1>

                            <p className="text-justify text-md text-gray-200 font-geist">
                                Somos uma marcenaria que planeja e executa
                                projetos no ramo de móveis planejados e
                                modulares de qualidade.
                            </p>
                        </div>

                        <div className="flex w-full justify-between items-center mt-8">
                            <div className="flex gap-4 flex-wrap">
                                <Button
                                    className="w-fit rounded-full"
                                    variant="brand"
                                >
                                    <SwatchBook className="size-4" />
                                    Veja nosso portfólio
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row lg:flex-col rounded-sm overflow-hidden">
                        {socialMediaLinks.map((link) => (
                            <Button
                                className="rounded-none"
                                variant="brand"
                                size="icon-lg"
                                asChild
                            >
                                <Link href={link.href} target="_blank">
                                    <link.icon />
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
