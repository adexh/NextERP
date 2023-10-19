import Button from "@/components/ui/button";

export default function Settings() {
  return (
    <div className="flex-col m-20">
      <Button label="User" redirects="/settings/users" />
    </div>
  );
}