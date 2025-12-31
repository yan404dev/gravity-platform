'use client';

import { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

interface TextFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export const TextField = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  className,
  inputClassName = 'w-full border border-white/20 bg-white/10 px-4 py-3 text-white transition-colors focus:border-[#FA76FF] focus:outline-none',
  labelClassName = 'mb-2 block text-sm font-medium tracking-wide text-white uppercase',
}: TextFieldProps<TFieldValues>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={className}>
        <FormLabel className={labelClassName}>
          {label}
        </FormLabel>
        <FormControl>
          <Input
            type={type}
            placeholder={placeholder}
            className={inputClassName}
            {...field}
          />
        </FormControl>
        <FormMessage className="mt-1 text-xs" />
      </FormItem>
    )}
  />
);
