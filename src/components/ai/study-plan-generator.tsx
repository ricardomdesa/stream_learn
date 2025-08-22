'use client';

import { useState, useTransition } from 'react';
import { Sparkles, Loader2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { generateStudyPlanAction } from '@/app/actions';
import { courses } from '@/lib/data';
import { useCourseProgress } from '@/hooks/use-course-progress';

export function StudyPlanGenerator() {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { progress } = useCourseProgress(null);

  const handleGeneratePlan = async () => {
    startTransition(async () => {
      const courseTitles = courses.map((c) => c.title);
      const { plan: generatedPlan, error } = await generateStudyPlanAction(courseTitles, progress);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }
      if (generatedPlan) {
        setPlan(generatedPlan);
      }
    });
  };

  const handleDownload = () => {
    const blob = new Blob([plan], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'StreamLearn_Study_Plan.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({
      title: 'Success',
      description: 'Your study plan has been downloaded.',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Sparkles className="mr-2 h-4 w-4 text-accent" />
          AI Study Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            Generate Your Personalized Study Plan
          </DialogTitle>
          <DialogDescription>
            Our AI will analyze your progress and course materials to create a
            custom learning path for you.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isPending ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 font-medium">Generating your plan...</p>
              <p className="text-sm text-muted-foreground">This may take a moment.</p>
            </div>
          ) : plan ? (
            <div className="max-h-[400px] overflow-y-auto rounded-lg border bg-secondary/50 p-4">
              <pre className="whitespace-pre-wrap font-sans text-sm">{plan}</pre>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                <p className="font-medium">Ready to get your personalized study plan?</p>
                <p className="mt-2 text-sm text-muted-foreground">Click the button below to start.</p>
            </div>
          )}
        </div>
        <DialogFooter>
          {plan && !isPending && (
            <Button onClick={handleDownload} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Plan
            </Button>
          )}
          <Button onClick={handleGeneratePlan} disabled={isPending}>
            {isPending ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>) 
            : plan ? 'Regenerate Plan' : 'Generate Plan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
