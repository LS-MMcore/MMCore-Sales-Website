import type React from "react"
import { CheckCircle2, Package, FileText, Truck, MapPin } from "lucide-react"

type TrackingStage = {
    id: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    completed: boolean
    current: boolean
}

type TrackingProgressBarProps = {
    scans: Array<{
        code: string
        dateTime: string
        description?: string
        location?: string
    }>
    lastStatus?: {
        code: string
        dateTime: string
    }
}

function getStageFromCode(code: string): string {
    // Delivered statuses
    if (code === "9000" || code.startsWith("900")) {
        return "delivered"
    }

    // Out for delivery
    if (code === "5000" || code === "5001" || code.startsWith("500")) {
        return "out-for-delivery"
    }

    // In transit, at depot, or moving
    if (
        code === "2003" ||
        code === "3001" ||
        code === "3050" ||
        code === "3000" ||
        code === "216" ||
        code === "3005" ||
        code === "217" ||
        code === "218"
    ) {
        return "in-transit"
    }

    // Customs/Documentation
    if (code.startsWith("20") || code === "97" || code === "98" || code === "99" || code === "213") {
        return "customs"
    }

    // Default to preparing for early stages
    return "preparing"
}

function getLatestCompletedStage(scans: TrackingProgressBarProps["scans"]): string {
    if (!scans.length) return "preparing"

    // Sort scans by date to get the latest
    const sortedScans = [...scans].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())

    const latestScan = sortedScans[0]
    return getStageFromCode(latestScan.code)
}

export default function TrackingProgressBar({ scans, lastStatus }: TrackingProgressBarProps) {
    const currentStage = getLatestCompletedStage(scans)

    const stages: TrackingStage[] = [
        {
            id: "preparing",
            label: "Preparing",
            icon: Package,
            completed: ["preparing", "customs", "in-transit", "out-for-delivery", "delivered"].includes(currentStage),
            current: currentStage === "preparing",
        },
        {
            id: "customs",
            label: "Customs",
            icon: FileText,
            completed: ["customs", "in-transit", "out-for-delivery", "delivered"].includes(currentStage),
            current: currentStage === "customs",
        },
        {
            id: "in-transit",
            label: "In Transit",
            icon: MapPin,
            completed: ["in-transit", "out-for-delivery", "delivered"].includes(currentStage),
            current: currentStage === "in-transit",
        },
        {
            id: "out-for-delivery",
            label: "Out for Delivery",
            icon: Truck,
            completed: ["out-for-delivery", "delivered"].includes(currentStage),
            current: currentStage === "out-for-delivery",
        },
        {
            id: "delivered",
            label: "Delivered",
            icon: CheckCircle2,
            completed: currentStage === "delivered",
            current: currentStage === "delivered",
        },
    ]

    const getLastUpdateForStage = (stageId: string) => {
        const relevantScans = scans.filter((scan) => getStageFromCode(scan.code) === stageId)
        if (!relevantScans.length) return null

        return relevantScans.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())[0]
    }

    const latestUpdate = lastStatus ? new Date(lastStatus.dateTime) : null

    return (
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-100 mb-4">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                        {currentStage === "delivered" ? "Delivered" : "In Progress"}
                    </h3>
                    {latestUpdate && <span className="text-sm text-slate-500">{latestUpdate.toLocaleDateString()}</span>}
                </div>
                {latestUpdate && (
                    <p className="text-sm text-slate-600">
                        Last update: {latestUpdate.toLocaleDateString()} at {latestUpdate.toLocaleTimeString()}
                    </p>
                )}
            </div>

            {/* Progress Bar */}
            <div className="relative">
                {/* Background line */}
                <div className="absolute top-6 left-6 right-6 h-0.5 bg-slate-200" />

                {/* Progress line */}
                <div
                    className="absolute top-6 left-6 h-0.5 bg-green-500 transition-all duration-1000 ease-out"
                    style={{
                        width: `calc(${((stages.filter((s) => s.completed).length - 1) / (stages.length - 1)) * 100}% - 0px)`,
                    }}
                />

                {/* Stages */}
                <div className="flex justify-between">
                    {stages.map((stage, index) => {
                        const Icon = stage.icon
                        const stageUpdate = getLastUpdateForStage(stage.id)

                        return (
                            <div key={stage.id} className="flex flex-col items-center relative">
                                {/* Icon circle */}
                                <div
                                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ease-out z-10 bg-white
                    ${stage.completed
                                            ? "border-green-500 bg-green-50"
                                            : stage.current
                                                ? "border-blue-500 bg-blue-50 animate-pulse"
                                                : "border-slate-300 bg-slate-50"
                                        }
                  `}
                                >
                                    <Icon
                                        className={`
                      w-5 h-5 transition-colors duration-300
                      ${stage.completed ? "text-green-600" : stage.current ? "text-blue-600" : "text-slate-400"}
                    `}
                                    />
                                </div>

                                {/* Label */}
                                <div className="mt-3 text-center">
                                    <div
                                        className={`
                      text-sm font-medium transition-colors duration-300
                      ${stage.completed ? "text-green-700" : stage.current ? "text-blue-700" : "text-slate-500"}
                    `}
                                    >
                                        {stage.label}
                                    </div>
                                    {stageUpdate && stage.completed && (
                                        <div className="text-xs text-slate-400 mt-1">
                                            {new Date(stageUpdate.dateTime).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
