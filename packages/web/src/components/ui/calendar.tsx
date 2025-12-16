"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, useNavigation, CaptionProps } from "react-day-picker";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { buttonVariants, Button } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function CustomCaption(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const displayMonth = props.calendarMonth.date;

  return (
    <div className="flex justify-between items-center border border-black px-2 py-1 mb-4">
      <span className="text-base md:text-lg lg:text-xl font-normal">
        {format(displayMonth, "MMMM yyyy")}
      </span>
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-none"
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-none"
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-0 font-sans", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground w-9 font-normal text-[0.8rem] rounded-none",
        row: "flex w-full mt-2",

        // v9 Day Cells & Buttons
        day: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-none hover:bg-gray-100"
        ),

        selected:
          "bg-black text-white hover:bg-black hover:text-white focus:bg-black focus:text-white",
        today: "border border-black text-black",
        outside:
          "day-outside text-gray-400 opacity-50 aria-selected:bg-gray-100 aria-selected:text-gray-500 aria-selected:opacity-30",
        disabled: "text-gray-400 opacity-50",
        hidden: "invisible",

        ...classNames,
      }}
      /* components={{
        Caption: CustomCaption,
      }} */
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
