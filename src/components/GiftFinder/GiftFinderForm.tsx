import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from '@/lib/utils';
import { GiftFinderFormData, FormStep } from '@/types/giftFinder';

interface GiftFinderFormProps {
  currentStep: FormStep;
  formData: GiftFinderFormData;
  setFormData: React.Dispatch<React.SetStateAction<GiftFinderFormData>>;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  handleFormSubmit: () => void;
  isSubmitting: boolean;
}

const GiftFinderForm = ({
  currentStep,
  formData,
  setFormData,
  goToNextStep,
  goToPrevStep,
  handleFormSubmit,
  isSubmitting
}: GiftFinderFormProps) => {
  const form = useForm<GiftFinderFormData>({
    defaultValues: formData
  });

  const onSubmitStep = (data: Partial<GiftFinderFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    
    if (currentStep === FormStep.BUDGET) {
      handleFormSubmit();
    } else {
      goToNextStep();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case FormStep.RECIPIENT:
        return (
          <div className="space-y-6 animate-fade-in">
            <FormField
              control={form.control}
              name="relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80 text-lg">Who is this gift for?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
                    >
                      {["Friend", "Family Member", "Partner", "Colleague", "Child", "Other"].map((relationship) => (
                        <div key={relationship} 
                          onClick={() => field.onChange(relationship)} 
                          className={cn(
                            "glass-card border border-white/10 rounded-lg p-4 cursor-pointer transition-all hover:border-primary/50 text-center",
                            field.value === relationship ? "border-primary text-primary" : "text-white/70"
                          )}
                        >
                          <FormControl>
                            <RadioGroupItem value={relationship} className="sr-only" />
                          </FormControl>
                          <FormLabel className="cursor-pointer w-full flex justify-center items-center">
                            {relationship}
                          </FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80 text-lg">What is their age?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
                    >
                      {["Under 18", "18-25", "26-35", "36-45", "46-60", "60+"].map((ageRange) => (
                        <div key={ageRange}
                          onClick={() => field.onChange(ageRange)}
                          className={cn(
                            "glass-card border border-white/10 rounded-lg p-4 cursor-pointer transition-all hover:border-primary/50 text-center",
                            field.value === ageRange ? "border-primary text-primary" : "text-white/70"
                          )}
                        >
                          <FormControl>
                            <RadioGroupItem value={ageRange} className="sr-only" />
                          </FormControl>
                          <FormLabel className="cursor-pointer w-full flex justify-center items-center">
                            {ageRange}
                          </FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case FormStep.OCCASION:
        return (
          <div className="space-y-6 animate-fade-in">
            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80 text-lg">What's the occasion?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
                    >
                      {["Birthday", "Anniversary", "Wedding", "Christmas", "Graduation", "Just Because", "Other"].map((occasion) => (
                        <div key={occasion}
                          onClick={() => field.onChange(occasion)}
                          className={cn(
                            "glass-card border border-white/10 rounded-lg p-4 cursor-pointer transition-all hover:border-primary/50 text-center",
                            field.value === occasion ? "border-primary text-primary" : "text-white/70"
                          )}
                        >
                          <FormControl>
                            <RadioGroupItem value={occasion} className="sr-only" />
                          </FormControl>
                          <FormLabel className="cursor-pointer w-full flex justify-center items-center">
                            {occasion}
                          </FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80 text-lg">What are their interests? (separate by commas)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Technology, Books, Outdoor Activities..."
                      className="bg-background/40 border-white/10 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case FormStep.BUDGET:
        return (
          <div className="space-y-6 animate-fade-in">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80 text-lg">What's your budget range?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
                    >
                      {["Under $25", "$25-$50", "$50-$100", "$100-$250", "$250-$500", "$500+"].map((budget) => (
                        <div key={budget}
                          onClick={() => field.onChange(budget)}
                          className={cn(
                            "glass-card border border-white/10 rounded-lg p-4 cursor-pointer transition-all hover:border-primary/50 text-center",
                            field.value === budget ? "border-primary text-primary" : "text-white/70"
                          )}
                        >
                          <FormControl>
                            <RadioGroupItem value={budget} className="sr-only" />
                          </FormControl>
                          <FormLabel className="cursor-pointer w-full flex justify-center items-center">
                            {budget}
                          </FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Update progress steps to only 3 steps
  const steps = ["Recipient", "Occasion", "Budget"];
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <Card className="glass-card border border-white/10 p-6 md:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div 
              key={step} 
              className={cn(
                "text-sm text-center transition-colors",
                index <= currentStep ? "text-primary" : "text-white/50"
              )}
            >
              {step}
            </div>
          ))}
        </div>
        
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmitStep)} 
          className="space-y-6"
        >
          {renderStepContent()}
          
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={goToPrevStep}
              disabled={currentStep === 0 || isSubmitting}
              className="border-white/20 text-white/70 hover:bg-white/5"
            >
              Back
            </Button>
            
            <Button 
              type="submit"
              className="neomorphic-button"
              disabled={isSubmitting}
            >
              {currentStep === FormStep.BUDGET ? (
                isSubmitting ? "Finding Perfect Gifts..." : "Find Gifts"
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default GiftFinderForm;
