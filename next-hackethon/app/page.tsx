import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex gap-3">
      <p>first</p>
      <p>Second</p>
      <Button>click me</Button>
      <Button variant={"destructive"}>click me</Button>
      <Button variant={"secondary"}>click me</Button>
      <Button variant={"tertiary"}>click me</Button>
    </div>
  );
}
