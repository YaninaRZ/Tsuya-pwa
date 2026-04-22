import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Header({ user }) {
    const navigate = useNavigate()
    const name = user?.user_metadata?.name || 'Toi'

    return (
        <div className="flex flex-col px-5 pt-8 gap-4">
            {/* Top row */}
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white" style={{ fontFamily: 'Georgia, serif', letterSpacing: '4px' }}>
                    TSUYA
                </span>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="rounded-xl relative">
                        <span style={{ fontSize: 16 }}>🔔</span>
                        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#C0C0C0]" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate('/profile')}
                        className="rounded-xl text-sm font-bold text-[#C0C0C0] border-[#C0C0C0]/30 bg-[#C0C0C0]/15"
                        style={{ letterSpacing: '1px' }}
                    >
                        {name.charAt(0).toUpperCase()}
                    </Button>
                </div>
            </div>

            {/* Greeting */}
            <div>
                <p className="text-xs mb-1 text-white/30 tracking-widest">BONJOUR,</p>
                <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                    {name.toUpperCase()}.
                </h1>
                <p className="text-sm mt-1 text-white/35 tracking-wider">
                    WHAT WILL YOU ACCOMPLISH TODAY?
                </p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="today">
                <TabsList>
                    <TabsTrigger value="today">TODAY</TabsTrigger>
                    <TabsTrigger value="clubs">CLUBS</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}
