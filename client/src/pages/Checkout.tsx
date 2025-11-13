import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderSummary from "@/components/OrderSummary";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState<"shipping" | "payment" | "review">("shipping");
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const steps = [
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
    { id: "review", label: "Review" },
  ];

  const subtotal = 79.97;
  const tax = 7.20;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("payment");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={3} />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                        currentStep === step.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : steps.findIndex((s) => s.id === currentStep) > idx
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border"
                      }`}
                      data-testid={`step-${step.id}`}
                    >
                      {steps.findIndex((s) => s.id === currentStep) > idx ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <span className="text-sm">{idx + 1}</span>
                      )}
                    </div>
                    <span
                      className={`hidden md:inline text-sm font-medium ${
                        currentStep === step.id
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <Separator className="w-8 md:w-16" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {currentStep === "shipping" && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6" data-testid="text-shipping-title">
                    Shipping Information
                  </h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={shippingData.firstName}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, firstName: e.target.value })
                          }
                          required
                          data-testid="input-first-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={shippingData.lastName}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, lastName: e.target.value })
                          }
                          required
                          data-testid="input-last-name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingData.email}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, email: e.target.value })
                        }
                        required
                        data-testid="input-email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={shippingData.address}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, address: e.target.value })
                        }
                        required
                        data-testid="input-address"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={shippingData.city}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, city: e.target.value })
                          }
                          required
                          data-testid="input-city"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={shippingData.state}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, state: e.target.value })
                          }
                          required
                          data-testid="input-state"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                          id="zip"
                          value={shippingData.zip}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, zip: e.target.value })
                          }
                          required
                          data-testid="input-zip"
                        />
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full" data-testid="button-continue-payment">
                      Continue to Payment
                    </Button>
                  </form>
                </Card>
              )}

              {currentStep === "payment" && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6" data-testid="text-payment-title">
                    Payment Information
                  </h2>
                  <div className="space-y-6">
                    <div className="p-6 border-2 border-dashed rounded-md text-center">
                      <p className="text-muted-foreground mb-2">
                        Stripe integration will be added here
                      </p>
                      <Badge variant="outline">Coming Soon</Badge>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep("shipping")}
                        className="flex-1"
                        data-testid="button-back-shipping"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => setCurrentStep("review")}
                        className="flex-1"
                        data-testid="button-continue-review"
                      >
                        Continue to Review
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {currentStep === "review" && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6" data-testid="text-review-title">
                    Review Order
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Shipping Address</h3>
                      <p className="text-sm text-muted-foreground">
                        {shippingData.firstName} {shippingData.lastName}
                        <br />
                        {shippingData.address}
                        <br />
                        {shippingData.city}, {shippingData.state} {shippingData.zip}
                      </p>
                    </div>
                    <Separator />
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep("payment")}
                        className="flex-1"
                        data-testid="button-back-payment"
                      >
                        Back
                      </Button>
                      <Button className="flex-1" size="lg" data-testid="button-place-order">
                        Place Order
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OrderSummary
                  subtotal={subtotal}
                  tax={tax}
                  checkoutLabel="Review Order"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
