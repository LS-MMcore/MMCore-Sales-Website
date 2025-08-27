"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Key, Zap, Shield, BookOpen, ExternalLink, ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"

const apiEndpoints = [
  {
    method: "GET",
    endpoint: "/auth",
    description: "Authenticate and validate your API credentials",
    parameters: ["AUTH_USER", "AUTH_PW"],
    response: "authentication_status, permissions, rate_limits",
    example: `curl --location 'https://api.mmcore.tech/auth' \\
--header 'AUTH_USER=YOUR_AUTH_USER' \\
--header 'AUTH_PW=YOUR_AUTH_PW'`,
  },
  {
    method: "GET",
    endpoint: "/get_tracking_information/APIKEY/tracking_code",
    description: "Get detailed tracking information for shipments with comprehensive query parameters",
    parameters: ["APIKEY", "tracking_code", "flight_tracking_setting", "lang", "type", "tracking_details"],
    queryParams: [
      { name: "lang", values: "en, nl", default: "en", description: "Sets the language for the API response" },
      {
        name: "flight_tracking_setting",
        values: "only, include, exclude",
        default: "exclude",
        description: "Defines how flight/waybill tracking should be handled",
      },
      {
        name: "type",
        values: "barcode, waybill, box",
        default: "barcode",
        description: "Specifies the type of tracking being used",
      },
      {
        name: "tracking_details",
        values: "minimal, lastStatus, full",
        default: "full",
        description: "Defines the level of detail in the tracking response",
      },
    ],
    response: "tracking_events, current_status, estimated_delivery, carrier_info, flight_tracking",
    example: `# Single tracking
curl --location 'https://api.mmcore.tech/get_tracking_information/APIKEY/tracking_code?flight_tracking_setting=include&lang=en&type=barcode&tracking_details=full' \\
--data ''

# Bulk tracking
curl --location --request GET 'https://api.mmcore.tech/get_tracking_information/APIKEY/tracking_code?flight_tracking_setting=include&lang=en&type=barcode&tracking_details=full' \\
--data '[
    "123456789",
    "987654321",
    "123498765",
    "567894321"
]'`,
  },
  {
    method: "POST",
    endpoint: "/action/APIKEY/101/",
    description: "Request a carrier label for a specific country with various output options",
    parameters: ["created_by", "carrier", "carrier_option", "weight", "dimensions", "recipient_info", "sender_info"],
    queryParams: [
      { name: "pl", values: "Y, N", default: "N", description: "Y = Show PDF label, N = get JSON result" },
      { name: "dhlzpl", values: "Y, N", default: "N", description: "Y = get DHL JSON Label, N = get URL to get PDF" },
      { name: "zpl", values: "Y, N", default: "N", description: "Y = get ZPL label if carrier supports it" },
      { name: "o", values: "JSON", default: "", description: "Output will be in JSON format" },
      { name: "dl", values: "Y, N", default: "N", description: "Y = the label will be called within this call" },
    ],
    response: "label_url, tracking_number, shipment_id, processing_status",
    example: `curl --location 'https://api.mmcore.tech/action/APIKEY/101/?pl=Y&zpl=N&o=JSON' \\
--header 'Content-Type: application/json' \\
--data '{
    "created_by": "API_USER",
    "standard_email_to_sender": "sender@example.com",
    "standard_email_to_receiver": "receiver@example.com",
    "print_phone_number": "+31612345678",
    "carrier": 9999,
    "carrier_option": 0,
    "signature_required": false,
    "number_of_packages": 1,
    "weight": 0.12,
    "value": 22.99,
    "length": 1.0,
    "width": 2.0,
    "height": 3.0,
    "is_company": false,
    "company_name": "",
    "department": "",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@email.com",
    "content": "Electronics",
    "content_on_label": "",
    "street": "Test Street",
    "street2": "",
    "house_number": "123",
    "postal_code": "1012AB",
    "city": "Amsterdam",
    "country": "Netherlands",
    "phone_number": "+31612345678",
    "reference": "ORDER-001",
    "reference2": "",
    "vat_number": "",
    "return_label": false
}'`,
  },
  {
    method: "POST",
    endpoint: "/post_manifest_data/APIKEY",
    description: "Upload manifest data to the database for shipment processing (supports bulk uploads)",
    parameters: ["waybill", "packageId", "parcelId", "recipient_info", "sender_info", "item_details", "ls (optional)"],
    queryParams: [
      {
        name: "ls",
        values: "Y, N",
        default: "N",
        description:
          "Y = Lock manifest data (if there are no errors), N = Don't lock manifest data. ONLY APPLICABLE FOR AIRWAYBILLS",
      },
    ],
    response: "upload_status, validation_errors, manifest_id",
    example: `curl --location 'https://api.mmcore.tech/post_manifest_data/APIKEY?ls=Y' \\
--header 'Content-Type: application/json' \\
--data '[
    {
        "waybill": "999-12345678",
        "packageId": "1",
        "parcelId": "123456",
        "name": "John Doe",
        "address": "Test Street",
        "address2": "",
        "zipcode": "1012AB",
        "city": "Amsterdam",
        "country": "NL",
        "phone": "0612345678",
        "email": "john.doe@mail.com",
        "sellerName": "Your Company",
        "sellerAddress": "Business Street 123",
        "sellerZipcode": "3011AD",
        "sellerCity": "Rotterdam",
        "sellerCountry": "NL",
        "sku": "PRODUCT-001",
        "content": "Electronics",
        "hsCode": "123456",
        "quantity": "1",
        "itemPrice": "10.00",
        "parcelWeight": "0.20",
        "currency": "EUR",
        "parcelPrice": "10.20",
        "taxType": "IOSS",
        "taxIdent": "IM1234567890",
        "grossWeight": "100"
    },
    {
        "waybill": "999-12345678",
        "packageId": "2",
        "parcelId": "654321",
        "name": "Jane Smith",
        "address": "Another Street",
        "address2": "Apt 2B",
        "zipcode": "2000AB",
        "city": "Haarlem",
        "country": "NL",
        "phone": "0687654321",
        "email": "jane.smith@mail.com",
        "sellerName": "Your Company",
        "sellerAddress": "Business Street 123",
        "sellerZipcode": "3011AD",
        "sellerCity": "Rotterdam",
        "sellerCountry": "NL",
        "sku": "PRODUCT-002",
        "content": "Clothing",
        "hsCode": "654321",
        "quantity": "2",
        "itemPrice": "15.00",
        "parcelWeight": "0.30",
        "itemWeight": "0.32",
        "currency": "EUR",
        "parcelPrice": "30.00",
        "taxType": "IOSS",
        "taxIdent": "IM1234567890",
        "grossWeight": "150"
    }
]'`,
  },
  {
    method: "POST",
    endpoint: "/lock_shipment/APIKEY",
    description:
      "Lock a shipment to prevent further changes (Airwaybills only). This notifies that the shipment is complete.",
    parameters: ["waybill", "APIKEY"],
    response: "lock_status, confirmation_message",
    example: `curl --location 'https://api.mmcore.tech/lock_shipment/APIKEY' \\
--header 'Content-Type: application/json' \\
--data '{"waybill":"999-12345678"}'`,
  },
]

const statusCodes = [
  { code: "97", description: "Manifested for customs" },
  { code: "98", description: "Label data has been pre-registered" },
  { code: "99", description: "Label has been created" },
  { code: "200", description: "Dispatch declaration" },
  { code: "201", description: "Dispatch arrival" },
  { code: "202", description: "Dispatch documentation" },
  { code: "203", description: "Dispatch amendment" },
  { code: "204", description: "Dispatch cancellation" },
  { code: "205", description: "Customs clearance started" },
  { code: "207", description: "Customs Issue" },
  { code: "208", description: "Confiscated" },
  { code: "209", description: "Held by customs" },
  { code: "210", description: "Needs documents" },
  { code: "211", description: "Accepted" },
  { code: "213", description: "Parcel cleared" },
  { code: "214", description: "Cleared manually" },
  { code: "215", description: "Cancelled" },
  { code: "216", description: "Arrived in facility" },
  { code: "217", description: "Ready for last mile" },
  { code: "218", description: "Released to last mile" },
  { code: "219", description: "Job dispatched" },
  { code: "2000", description: "The cargo is being tracked" },
  { code: "2001", description: "Information has been sent, waiting for the logistics provider to pick up the cargo" },
  { code: "2002", description: "The logistics provider gets the cargo" },
  { code: "2003", description: "In transit" },
  { code: "2004", description: "The cargo arrived at their destination" },
  { code: "2005", description: "Notify the consignee to pick up the cargo" },
  { code: "2006", description: "The cargo is delivered to the consignee" },
  { code: "2007", description: "Packages were lost, damaged, returned, unclaimed, etc" },
  { code: "2008", description: "Shipping time too long" },
  { code: "3000", description: "Parcel has reached a depot" },
  { code: "3001", description: "Outbound scan" },
  { code: "3004", description: "Parcel details updated" },
  { code: "3005", description: "Parcel has arrived at the last-mile carrier" },
  { code: "3050", description: "Parcel has left the depot" },
  { code: "5000", description: "Parcel is out for delivery" },
  { code: "5001", description: "Parcel is out for delivery to recipient" },
  { code: "5002", description: "A text message notification has been sent to the recipient" },
  { code: "5003", description: "Parcel is out for delivery to parcel locker" },
  { code: "5004", description: "Parcel is out for delivery to parcel shop" },
  { code: "7000", description: "Recipient was not at home, second try:" },
  { code: "7001", description: "Recipient was not at home, package will be stored on the depot for 5 days" },
  { code: "7002", description: "Recipient was not at home" },
  { code: "7003", description: "Recipient was not at home, package can be picked up at a collection point" },
  { code: "7004", description: "Stored until requested" },
  { code: "8000", description: "Return to sender" },
  { code: "8001", description: "Shipment canceled" },
  { code: "8500", description: "Extra information" },
  { code: "9000", description: "Delivered" },
  { code: "9001", description: "Package is delivered to the neighbors" },
  { code: "9002", description: "Package is delivered to the parcelshop" },
  { code: "9003", description: "Package is delivered to the parcelbox" },
  { code: "9004", description: "Package is delivered to a secure place" },
  { code: "9005", description: "Package is collected" },
  { code: "9006", description: "Return delivered" },
  { code: "9500", description: "Refused" },
  { code: "9501", description: "Package was not picked up" },
  { code: "9502", description: "Package was not delivered" },
  { code: "9503", description: "Package is rerouted to a new address" },
  { code: "9600", description: "Incorrect address details" },
]

export default function ApiDocsPage() {
  const [expandedEndpoints, setExpandedEndpoints] = useState<number[]>([])
  const { t } = useLanguage()

  const toggleEndpoint = (index: number) => {
    setExpandedEndpoints((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-16">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#63b2dc]/10 via-[#63b2dc]/20 to-background">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-3 rounded-full" style={{ backgroundColor: "#63b2dc20" }}>
                  <Code className="h-8 w-8" style={{ color: "#63b2dc" }} />
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl" style={{ color: "#63b2dc" }}>
                {t("apiDocs.title")}
              </h1>
              <p className="mx-auto max-w-[800px] text-slate-700 text-lg md:text-xl">{t("apiDocs.subtitle")}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                  REST API
                </Badge>
                <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                  Real-time Tracking
                </Badge>
                <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                  Manifest Processing
                </Badge>
                <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                  Multi-carrier
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-800">
                {t("apiDocs.quickStart")}
              </h2>
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-lg">{t("apiDocs.getUpAndRunning")}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto mb-12">
              <Card className="border-[#63b2dc]/30">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: "#63b2dc20" }}>
                      <Key className="h-6 w-6" style={{ color: "#63b2dc" }} />
                    </div>
                    <CardTitle className="text-xl text-slate-800">1. {t("apiDocs.signUpForAccount")}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{t("apiDocs.includeAuthUser")}</p>
                </CardContent>
              </Card>

              <Card className="border-[#63b2dc]/30">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: "#63b2dc20" }}>
                      <BookOpen className="h-6 w-6" style={{ color: "#63b2dc" }} />
                    </div>
                    <CardTitle className="text-xl text-slate-800">2. {t("apiDocs.verifyCredentials")}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{t("apiDocs.verifyCredentials")}</p>
                </CardContent>
              </Card>

              <Card className="border-[#63b2dc]/30">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: "#63b2dc20" }}>
                      <Zap className="h-6 w-6" style={{ color: "#63b2dc" }} />
                    </div>
                    <CardTitle className="text-xl text-slate-800">3. {t("apiDocs.startProcessing")}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{t("apiDocs.startProcessing")}</p>
                </CardContent>
              </Card>
            </div>

            {/* Code Example */}
            <Card className="max-w-4xl mx-auto bg-slate-900 text-white">
              <CardHeader>
                <CardTitle className="text-white">{t("apiDocs.exampleAuthentication")}</CardTitle>
                <CardDescription className="text-slate-300">{t("apiDocs.basicExample")}</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="text-sm overflow-x-auto">
                  <code>{`// First, authenticate your credentials
curl --location 'https://api.mmcore.tech/auth' \\
--header 'AUTH_USER=YOUR_AUTH_USER' \\
--header 'AUTH_PW=YOUR_AUTH_PW'

// Upload manifest data
curl --location 'https://api.mmcore.tech/post_manifest_data/YOUR_API_KEY?ls=Y' \\
--header 'Content-Type: application/json' \\
--data '[{
  "waybill": "999-12345678",
  "packageId": "1",
  "parcelId": "123456",
  "name": "John Doe",
  "address": "Test Street",
  "zipcode": "1012AB",
  "city": "Amsterdam",
  "country": "NL",
  "phone": "0612345678",
  "email": "john.doe@mail.com",
  "sellerName": "Your Company",
  "sellerAddress": "Business Street 123",
  "sellerZipcode": "3011AD",
  "sellerCity": "Rotterdam",
  "sellerCountry": "NL",
  "sku": "PRODUCT-001",
  "content": "Electronics",
  "hsCode": "123456",
  "quantity": "1",
  "itemPrice": "10.00",
  "parcelWeight": "0.20",
  "currency": "EUR",
  "parcelPrice": "10.20",
  "taxType": "IOSS",
  "taxIdent": "IM1234567890"
}]'`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* API Reference */}
        <section className="w-full py-12 md:py-24 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-800">
                {t("apiDocs.endpoints")}
              </h2>
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-lg">{t("apiDocs.completeReference")}</p>
            </div>

            <div className="max-w-6xl mx-auto space-y-6">
              {apiEndpoints.map((endpoint, idx) => {
                const isExpanded = expandedEndpoints.includes(idx)
                return (
                  <Card key={idx} className="border-[#63b2dc]/30">
                    <CardHeader
                      className="cursor-pointer hover:bg-slate-50/50 transition-colors"
                      onClick={() => toggleEndpoint(idx)}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-3">
                          <Badge
                            variant={endpoint.method === "GET" ? "secondary" : "default"}
                            className={endpoint.method === "GET" ? "bg-green-100 text-green-800" : "text-white"}
                            style={endpoint.method !== "GET" ? { backgroundColor: "#63b2dc" } : {}}
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm font-mono">{endpoint.endpoint}</code>
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5 text-slate-500" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-slate-500" />
                          )}
                        </div>
                      </div>
                      <CardDescription>{endpoint.description}</CardDescription>
                    </CardHeader>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm text-slate-800 mb-2">{t("apiDocs.parameters")}</h4>
                            <div className="flex flex-wrap gap-2">
                              {endpoint.parameters.map((param, pidx) => (
                                <code key={pidx} className="bg-slate-100 px-2 py-1 rounded text-sm">
                                  {param}
                                </code>
                              ))}
                            </div>
                          </div>

                          {endpoint.queryParams && (
                            <div>
                              <h4 className="font-semibold text-sm text-slate-800 mb-2">Query Parameters</h4>
                              <div className="space-y-2">
                                {endpoint.queryParams.map((param, pidx) => (
                                  <div key={pidx} className="bg-slate-50 p-3 rounded border">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <code className="bg-slate-200 px-2 py-1 rounded text-xs font-mono">
                                        {param.name}
                                      </code>
                                      <span className="text-xs text-slate-500">Default: {param.default}</span>
                                    </div>
                                    <p className="text-xs text-slate-600 mb-1">{param.description}</p>
                                    <p className="text-xs text-slate-500">Values: {param.values}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div>
                            <h4 className="font-semibold text-sm text-slate-800 mb-2">{t("apiDocs.response")}</h4>
                            <p className="text-sm text-slate-600">{endpoint.response}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-slate-800 mb-2">{t("apiDocs.example")}</h4>
                            <div className="bg-slate-900 text-white p-3 rounded-lg overflow-x-auto">
                              <pre className="text-xs">
                                <code>{endpoint.example}</code>
                              </pre>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-800">
                {t("apiDocs.statusCodes")}
              </h2>
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-lg">{t("apiDocs.completeReference")}</p>
            </div>

            <Card className="max-w-6xl mx-auto border-[#63b2dc]/30">
              <CardHeader>
                <CardTitle className="text-slate-800">{t("apiDocs.statusCodes")}</CardTitle>
                <CardDescription>Status codes returned in tracking responses with their descriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 max-h-96 overflow-y-auto">
                  {statusCodes.map((status, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded border-l-4"
                      style={{ borderLeftColor: "#63b2dc" }}
                    >
                      <code className="font-mono text-sm font-semibold" style={{ color: "#63b2dc" }}>
                        {status.code}
                      </code>
                      <span className="text-sm text-slate-700 flex-1 ml-4">{status.description}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Authentication */}
        <section className="w-full py-12 md:py-24 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-800">
                {t("apiDocs.authentication")}
              </h2>
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-lg">{t("apiDocs.secureYourApi")}</p>
            </div>

            <Card className="max-w-4xl mx-auto border-[#63b2dc]/30">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6" style={{ color: "#63b2dc" }} />
                  <span className="text-slate-800">{t("apiDocs.headerAuthentication")}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 text-white p-4 rounded-lg">
                  <pre className="text-sm">
                    <code>{`# Authentication endpoint
curl --location 'https://api.mmcore.tech/auth' \\
--header 'AUTH_USER=YOUR_AUTH_USER' \\
--header 'AUTH_PW=YOUR_AUTH_PW'

# Other endpoints use API key in URL path
curl --location 'https://api.mmcore.tech/post_manifest_data/YOUR_API_KEY' \\
--header 'Content-Type: application/json' \\
--data '[{"waybill": "999-12345678", ...}]'`}</code>
                  </pre>
                </div>
                <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: "#63b2dc10" }}>
                  <p className="text-sm" style={{ color: "#63b2dc" }}>
                    <strong>Security Note:</strong> {t("apiDocs.keepCredentialsSecure")} {t("apiDocs.neverExpose")}{" "}
                    {t("apiDocs.useEnvironmentVariables")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-800">
                {t("apiDocs.faq.title")}
              </h2>
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-lg">{t("apiDocs.faq.subtitle")}</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {[
                {
                  question: t("apiDocs.faq.rateLimits.question"),
                  answer: t("apiDocs.faq.rateLimits.answer"),
                },
                {
                  question: t("apiDocs.faq.bulkTracking.question"),
                  answer: t("apiDocs.faq.bulkTracking.answer"),
                },
                {
                  question: t("apiDocs.faq.manifestLocking.question"),
                  answer: t("apiDocs.faq.manifestLocking.answer"),
                },
                {
                  question: t("apiDocs.faq.trackingLanguages.question"),
                  answer: t("apiDocs.faq.trackingLanguages.answer"),
                },
                {
                  question: t("apiDocs.faq.errorHandling.question"),
                  answer: t("apiDocs.faq.errorHandling.answer"),
                },
                {
                  question: t("apiDocs.faq.webhooks.question"),
                  answer: t("apiDocs.faq.webhooks.answer"),
                },
              ].map((faq, idx) => {
                const isExpanded = expandedEndpoints.includes(idx + 1000) // Use offset to avoid conflicts
                return (
                  <Card key={idx} className="border-[#63b2dc]/30">
                    <CardHeader
                      className="cursor-pointer hover:bg-slate-50/50 transition-colors"
                      onClick={() => toggleEndpoint(idx + 1000)}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-slate-800">{faq.question}</CardTitle>
                        <div className="flex items-center space-x-2">
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5 text-slate-500" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-slate-500" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <CardContent>
                        <p className="text-slate-600">{faq.answer}</p>
                      </CardContent>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="w-full py-12 md:py-24" style={{ backgroundColor: "#63b2dc10" }}>
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl" style={{ color: "#63b2dc" }}>
                {t("apiDocs.additionalResources")}
              </h2>
              <p className="text-slate-700 md:text-lg">{t("apiDocs.everythingYouNeed")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="text-white" style={{ backgroundColor: "#63b2dc" }}>
                  <Link href="https://documenter.getpostman.com/view/32448221/2sAYdhHVRS" target="_blank">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t("apiDocs.postmanCollection")}
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-transparent hover:text-white"
                  style={{ borderColor: "#63b2dc", color: "#63b2dc" }}
                >
                  <Link href="/#contact">{t("apiDocs.getSupport")}</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-transparent hover:text-white"
                  style={{ borderColor: "#63b2dc", color: "#63b2dc" }}
                >
                  <Link href="/api-docs/changelog">{t("apiDocs.changelog")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
