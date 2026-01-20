import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { Testimonial } from "../page";

export const TestimonialCard = (testimonial: Testimonial) => {
    return (
        <div className="p-4 border bg-muted/20 rounded-md min-w-80 w-80 h-fit flex flex-col gap-3 shrink-0">
            <div className="flex gap-2 items-center">
                <Avatar>
                    <AvatarImage src={testimonial.avatar} />

                    <AvatarFallback>
                        {testimonial.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="flex w-full justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">
                            {testimonial.location}
                        </span>

                        <h1 className="text-sm font-semibold">
                            {testimonial.name}
                        </h1>
                    </div>

                    <Badge variant="secondary">{testimonial.designation}</Badge>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm">{testimonial.rating}/5</span>

                <div className="flex gap-0.5 text-yellow-300">
                    {Array.from(
                        {
                            length: Math.floor(testimonial.rating),
                        },
                        (_, i) => (
                            <FaStar
                                className="size-3"
                                key={`card-${testimonial.id}-star-${i}`}
                            />
                        ),
                    )}

                    {testimonial.rating % 1 >= 0.5 && (
                        <FaStarHalf
                            className="size-3"
                            key={`card-${testimonial.id}-star-half`}
                        />
                    )}
                </div>
            </div>

            <p className="text-xs text-muted-foreground line-clamp-4">
                "{testimonial.message}"
            </p>
        </div>
    );
};
