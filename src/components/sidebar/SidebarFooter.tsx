import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { User, Settings, ShieldCheck, HelpCircle, LogOut } from "lucide-react"

export function SidebarFooter() {
  return (
    <div className="mt-auto p-4">
      <Separator className="mb-4" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center gap-3 justify-start px-2 py-2 h-auto"
          >
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="Avatar utilisateur"
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://ui-avatars.com/api/?name=Alex&background=0D8ABC&color=fff"
              }}
            />

            <div className="flex flex-col items-start text-left">
              <p className="text-sm font-medium">Alex</p>
              <p className="text-xs text-muted-foreground">
                Conducteur vérifié • 4.8 ⭐
              </p>
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span>Alex</span>
              <span className="text-xs text-muted-foreground">
                Compte actif et sécurisé
              </span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <User className="w-4 h-4 mr-2" />
            Voir mon profil
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className="w-4 h-4 mr-2" />
            Paramètres du compte
          </DropdownMenuItem>

          <DropdownMenuItem>
            <ShieldCheck className="w-4 h-4 mr-2" />
            Vérification et sécurité
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <HelpCircle className="w-4 h-4 mr-2" />
            Centre d’aide
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="text-red-500 focus:text-red-500">
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}