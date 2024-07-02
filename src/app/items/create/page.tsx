'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/auth";
import { createItemAction } from "./actions";
import { pageTitleStyles } from "@/styles";
import { DatePickerDemo } from "@/components/date-picker";
import { useState } from "react";

export default function createPage(){
  const [date, setDate] = useState<Date>();

  return (
    <main className="space-y-8">
      <h1 className={pageTitleStyles}>
        Post an Item to Sell
      </h1>
      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-md"
        action={createItemAction}
      >
        <Input required className="max-w-lg" name="name" placeholder="Name your item"/>
        <Input
          required 
          className="max-w-lg"
          name="startingPrice" 
          type="number"
          step="0.01"
          placeholder="What to start your auction at"
        />
        <Input
          type="file"
          name="file"
          required
        />
        <DatePickerDemo
          date={date}
          setDate={setDate}
        />
        <input type="hidden" name="endDate" value={date ? date.toISOString() : ''} />
        <Button className="self-end" type="submit">Place Item</Button>
      </form>
    </main>
  )
}
