import { UpdateStock } from '@/components/UpdateStock';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    return (
        <div className="min-h-screen bg-quanternary">
            <div className="mx-auto py-8 md:w-[70%]">
                <h1 className="text-4xl text-tertiary">
                    Update Stock{' '}
                    <span className="font-bold text-tertiary">
                        {id} for {formattedDate}
                    </span>
                </h1>
                <h2 className="mt-2 text-lg">
                    Use this form to update the stock on the system for {formattedDate} date. Please
                    ensure all required fields are completed with accurate information.
                </h2>
                <UpdateStock id={id} />
            </div>
        </div>
    );
}
