import Breadcrumbs from '../components/Breadcrumbs'
import SectionHeading from '../components/SectionHeading'
import SubscriptionSection from '../components/SubscriptionSection'
import { Sparkles } from 'lucide-react'

export const SubscptionPage = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
            <Breadcrumbs
                items={[
                    { label: "Subscription Process" }
                ]}
            />
            <section className=" pb-32">
                <SectionHeading icon={Sparkles} title="Subscription Process" />
                <SubscriptionSection />
            </section>
        </div>
    )
}
