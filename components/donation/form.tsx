import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { FOUNDATIONS } from "../../interfaces";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { cn } from "../../lib/utils";
import { useToast } from "../ui/use-toast";
import { donateFormState } from "@/lib/store";
import { LoadingDots } from "../shared/icons";

const formSchema = z.object({
  name: z.string({}).min(3).max(50, {
    message: "Adınız en az 3, en fazla 50 karakter olmalıdır",
  }),
  email: z.string().email({
    message: "Geçerli bir e-posta adresi girmelisiniz",
  }),
  amount: z
    .number()
    .min(1, {
      message: "Ücret en az 1 TL olmalıdır",
    })
    .max(100000, {
      message: "Ücret en fazla 100.000 TL olmalıdır",
    }),

  isAnonymous: z.boolean().default(false).optional(),
  foundation: z
    .nativeEnum(FOUNDATIONS, {
      required_error: "Kurum seçmelisiniz",
    })
    .default(FOUNDATIONS.MehmetcikVakfi),
  message: z.string().min(5).max(250).optional(),
});

const DonationForm = () => {
  const { toast } = useToast();
  const { setOpen } = donateFormState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: 0,
      isAnonymous: false,
      foundation: FOUNDATIONS.MehmetcikVakfi,
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("api/donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        toast({
          title: "Hata",
          description: "Bir hata oluştu. Lütfen tekrar deneyin.",
          variant: "destructive",
        });
      }

      const data = await response.json();
      toast({
        title: "Başarılı",
        description: "Bağışınız başarıyla alındı",
      });
      return data;
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setOpen(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-row justify-between gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>Adınız</FormLabel>
                <FormControl>
                  <Input placeholder="Adınız" {...field} />
                </FormControl>
                <FormDescription>
                  {form.formState.errors.name?.message}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>E-posta Adresiniz</FormLabel>
                <FormControl>
                  <Input placeholder="E-posta Adresiniz" {...field} />
                </FormControl>
                <FormDescription>
                  {form.formState.errors.email?.message}
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row justify-between gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>
                  Bağış Tutarı(&#x20BA;)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    min={0.0}
                    step={0.01}
                    max={100000.0}
                  />
                </FormControl>
                <FormDescription>
                  {form.formState.errors.amount?.message}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="foundation"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>Kurum</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Kurum" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(FOUNDATIONS).map((foundation) => (
                      <SelectItem key={foundation} value={foundation}>
                        {foundation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {form.formState.errors.foundation?.message}
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Mesajınız</FormLabel>
              <FormControl>
                <>
                  <Textarea placeholder="Mesajınız" {...field} />
                  <p
                    className={cn(
                      "text-sm text-zinc-600 font-light text-right",
                      (field.value ?? "").length > 250 && "text-red-600"
                    )}
                  >
                    {(field.value ?? "").length} / 250 karakter kullanıldı
                  </p>
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isAnonymous"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor={field.name}>Anonim Bağış</FormLabel>
                <FormDescription>
                  {form.formState.errors.isAnonymous?.message}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={form.formState.isSubmitting}
          type="submit"
        >
          {form.formState.isSubmitting ? <LoadingDots /> : "Gönder"}
        </Button>
      </form>
    </Form>
  );
};

export default DonationForm;
