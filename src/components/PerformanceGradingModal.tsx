
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface PerformanceGradingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  staffMember: any
  onUpdate?: () => void
}

export function PerformanceGradingModal({ open, onOpenChange, staffMember, onUpdate }: PerformanceGradingModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    punctuality_score: [85],
    satisfaction_score: [90],
    efficiency_score: [88],
    revenue_generated: "",
    notes: ""
  })

  const handleSubmit = async () => {
    if (!staffMember) return
    
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('staff_performance')
        .upsert({
          staff_id: staffMember.id,
          performance_date: new Date().toISOString().split('T')[0],
          punctuality_score: formData.punctuality_score[0],
          satisfaction_score: formData.satisfaction_score[0],
          efficiency_score: formData.efficiency_score[0],
          revenue_generated: parseFloat(formData.revenue_generated) || 0,
          notes: formData.notes
        })

      if (error) throw error

      toast({
        title: "Success",
        description: "Performance rating saved successfully",
      })

      onOpenChange(false)
      if (onUpdate) onUpdate()
    } catch (error) {
      console.error('Error saving performance:', error)
      toast({
        title: "Error",
        description: "Failed to save performance rating",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!staffMember) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Grade Performance - {staffMember.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Punctuality Score: {formData.punctuality_score[0]}%</Label>
            <Slider
              value={formData.punctuality_score}
              onValueChange={(value) => setFormData({...formData, punctuality_score: value})}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label>Customer Satisfaction: {formData.satisfaction_score[0]}%</Label>
            <Slider
              value={formData.satisfaction_score}
              onValueChange={(value) => setFormData({...formData, satisfaction_score: value})}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label>Efficiency Score: {formData.efficiency_score[0]}%</Label>
            <Slider
              value={formData.efficiency_score}
              onValueChange={(value) => setFormData({...formData, efficiency_score: value})}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="revenue">Revenue Generated ($)</Label>
            <Input
              id="revenue"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.revenue_generated}
              onChange={(e) => setFormData({...formData, revenue_generated: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any performance notes..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Performance"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
