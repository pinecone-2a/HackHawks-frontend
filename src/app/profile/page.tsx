import { Input } from "@/components/ui/input";
import { ProfileHeader } from "./_components/create_profile_header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ProfileSetup1 from "./_components/create_profile_setup_form_step1";
import ProfileSetup2 from "./_components/create_profile_setup_form_step2";
type Props = {
  searchParams: Promise<{
    step: string;
  }>;
};
export default async function Profile(props: Props) {
  const { step } = await props.searchParams;
  return (
    <div className="flex flex-col">
      <div className="py-6">
        <ProfileHeader />
      </div>
      {Number(step) == 1 && (
        <div className="flex justify-center items-center min-h-screen">
          <ProfileSetup1 />
        </div>
      )}
      {Number(step) == 2 && (
        <div className="flex justify-center items-center min-h-screen">
          <ProfileSetup2 />
        </div>
      )}

      <div className="flex justify-center items-center min-h-screen"></div>
    </div>
  );
}
