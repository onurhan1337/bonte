import { useAuth0 } from "@auth0/auth0-react";
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
import { cn, getUserId } from "../../lib/utils";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  name: z.string({}).min(3).max(50, {
    message: "Adınız en az 3, en fazla 50 karakter olmalıdır",
  }),
  email: z.string().email({
    message: "Geçerli bir e-posta adresi girmelisiniz",
  }),
  amount: z.number().min(1, {
    message: "Ücret en az 1 TL olmalıdır",
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
  const { user } = useAuth0();
  const { toast } = useToast();

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
    const userId = getUserId(user.sub);

    const createdAt = new Date();
    const updatedAt = new Date();
    try {
      const response = await fetch("http://localhost:3001/donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        body: JSON.stringify({
          ...values,
          createdAt: createdAt.toISOString(),
          updatedAt: updatedAt.toISOString(),
          userId,
        }),
      });

      if (!response.ok) {
        // TODO: Add here a toast notification to show the error
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
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
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
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Bağış Tutarı</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Bağış Tutarı"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  min={1}
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
            <FormItem>
              <FormLabel htmlFor={field.name}>Kurum</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                      field.value.length > 250 && "text-red-600"
                    )}
                  >
                    {field.value.length} / 250 karakter kullanıldı
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
        <Button className="w-full bg-blue-600 hover:bg-blue-700" type="submit">
          Gönder
        </Button>
      </form>
    </Form>
  );
};

export default DonationForm;
